import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: React.ComponentType<any> | React.FunctionComponent<any>;
  [x: string]: any;
}

export const PrivateRoute: React.FunctionComponent<Props> = (props) => {
  const { component: Component, ...rest } = props;
  const [shouldLogin, setShouldLogin] = useState<boolean | null>(null);
  const [loggedinBefore, setLoggedinBefore] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (props.path === '/login' && token) {
      console.log('شما قبلا وارید شدید');
      setLoggedinBefore(true);
    }
    if (props.isPrivate && !token) {
      console.log('ابتدا باید وارد شوید');
      setShouldLogin(true);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProp) => {
        if (shouldLogin) {
          return <Redirect to="/login" />;
        } else if (loggedinBefore) {
          return <Redirect to="/home" />;
        }
        return <Component {...routeProp} />;
      }}
    />
  );
};
