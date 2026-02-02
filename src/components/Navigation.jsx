import { AuthenticationForm } from "./forms/AuthenticationForm";

export const Navigation = ({ children }) => {
  return ( 
    <nav>
      <AuthenticationForm />
        {children}
    </nav>
  );
}