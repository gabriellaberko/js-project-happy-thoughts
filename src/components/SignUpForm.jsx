export const SignUpForm = () => {
  return(
    <form>
      <label for="email">Email:</label>
      <input id="email" type="email"placeholder="example@example.com" required></input>
      <label for="name" type="text">Name:</label>
      <input id="name" type="text" placeholder="Jessica" required></input>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" placeholder="Password" required></input>
        <p>ⓘ Must be at least 8 characters</p>
      </div>
      <button type="submit">Sign up</button>
    </form>
  )
};