import { useNavigate } from 'react-router-dom';
// SOURCE: https://stackoverflow.com/questions/70143135/how-to-use-react-router-dom-v6-navigate-in-class-component
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };

  return Wrapper;
};

