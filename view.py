@app.route('/<any(p1, materialRepo, coop, xianju, otherRepo, test):repocode>', methods=['GET', 'POST'])
def toc(repocode):
    if 'logged_in' in session and repocode in REPOCODE:
        if request.method == 'GET':
            data = getTable(repocode)
            # print(session)
            return render_template('table.html', table_name=REPO[repocode], d=data, repocode=repocode, name=session['name'], sudo=sudo(session['username']))
        else:
            data = request.get_data(as_text=True)
            document = json.loads(data)
            updateTable(repocode, document)

            flash(f'修改成功！', 'success')
            return redirect(url_for('home'))
    else:
        abort(404)


@app.route('/base', methods=["GET"])
def base():
    return render_template('base.html')

@app.route('/', methods=["GET", "POST"])
def home():
    if 'logged_in' in session:
        nd = nearestDoc()
        return render_template('home.html', title='首页', name=session['name'], danhao=nd[0], riqi=nd[1])
    else:
        return render_template('home.html', title='首页')

@app.route('/logout', methods=["GET"])
def logout():
    session.pop('logged_in')
    return redirect('/')

@app.route('/register', methods=["GET", "POST"])
def register():
    rf = RegisterForm()
    if rf.validate_on_submit():
        flash(f'注册成功, {rf.username.data}', 'success')
        username = rf.username.data
        name = rf.name.data
        password = rf.password.data
        registerUser(username, name, password)
        return redirect(url_for('base'))

    return render_template('register.html', form=rf, title="注册")

@app.route('/login', methods=["GET", "POST"])
def login():
    lf = LoginForm()
    if lf.validate_on_submit():
        username = lf.username.data
        passhash = generate_password_hash(lf.password.data)
        
        user = loginUser(username, passhash)
        if user:
            flash(f'登录成功, {lf.username.data}', 'success')
            session['logged_in'] = True
            session['username'] = user['username']
            session['name'] = user['name']
            return redirect(url_for('index'))
        else:
            flash(f'账户名或密码错误, {lf.username.data}', 'danger')

    return render_template('login.html', form=lf, title="登录")

@app.route('/index', methods=["GET"])
def index():
    """Render website's home page."""
    if 'logged_in' in session:
        nd = nearestDoc()
        return render_template('index.html', name=session['name'], docs=docs.find({}), docs2=docs2.find({}), danhao=nd[0], riqi=nd[1])
    else:
        flash(f'你还没有登录', 'danger')
        return redirect(url_for('login'))


@app.route('/doc/<docid>', methods=['GET', "POST"])
def doc(docid):
    if 'logged_in' in session:
        if request.method == 'GET':
            doc = getDoc(docid)
            doc = {k:v for k,v in doc.items() if v} 
            # print(doc)
            return render_template('form.html', docid=docid, d=doc, sudo=sudo(session['username']))
        else:
            form = request.form
            d = {k:v.strip() for k,v in dict(form).items()}
            d['id'] = docid
            d['time'] = datetime.now().strftime("%Y-%m-%d %H:%M")
            d['last_modified'] = session['name']
            update(d, docs)
            flash(f'修改成功！', 'success')
            return redirect(url_for('index'))
    else:
        abort(404)

@app.route('/newdoc', methods=["GET", "POST"])
def newdoc():
    if sudo(session['username']):
        number = str(datetime.now())
        print(number)
        docs.insert_one({'id':number, 'created_at':datetime.now().strftime("%Y-%m-%d %H:%M")})
        return redirect('/doc/'+number)
    else:
        flash(f'新建失败，你没有权限', 'danger')
        return redirect(url_for('index'))    

@app.route('/doc2/<docid>', methods=['GET', "POST"])
def doc2(docid):
    if 'logged_in' in session:
        if request.method == 'GET':
            doc = getDoc2(docid)
            doc = {k:v for k,v in doc.items() if v} 
            # print(doc)
            return render_template('form2.html', docid=docid, d=doc, sudo=sudo(session['username']))
        else:
            form = request.form
            d = {k:v.strip() for k,v in dict(form).items()}
            d['id'] = docid
            d['time'] = datetime.now().strftime("%Y-%m-%d %H:%M")
            d['last_modified'] = session['name']
            update2(d, docs)
            flash(f'修改成功！', 'success')
            return redirect(url_for('index'))
    else:
        abort(404)

@app.route('/newdoc2', methods=["GET", "POST"])
def newdoc2():
    # return render_template('form2.html')
    if sudo(session['username']):
        number = str(datetime.now())
        docs2.insert_one({'id':number, 'created_at':datetime.now().strftime("%Y-%m-%d %H:%M")})
        return redirect('/doc2/'+number)
    else:
        flash(f'新建失败，你没有权限', 'danger')
        return redirect(url_for('index'))     

@app.route('/<any(repo, jiagong, waijiagong):indexName>', methods=['GET', 'POST'])
def show_index(indexName):
    if 'logged_in' in session:
        nd = nearestDoc()
        return render_template(indexName+'.html', name=session['name'], docs=docs.find({}),  danhao=nd[0], riqi=nd[1])
    else:
        flash(f'你还没有登录', 'danger')
        return redirect(url_for('login'))

@app.route('/delete/<order>', methods=["GET", "POST"])
def delete(order):
    if sudo(session['username']):
        flash(f'删除成功！', 'success')
        docs.delete_one({'id':order})
        return redirect(url_for('index'))
    else:
        flash(f'删除失败，你没有权限', 'danger')
        return redirect(url_for('index'))
