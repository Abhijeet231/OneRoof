
const Login = () => {

    return(
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="userName" >UserName:</label>
                    <input id="userName" type="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;