declare module 'react-facebook-login' {
    interface ReactFacebookLoginProps {
      appId: string;
      autoLoad?: boolean;
      fields?: string;
      callback: (response: any) => void;
      cssClass?: string;
      textButton?: string;
      icon?: React.ReactNode;
      version?: string;
      scope?: string;
      redirectUri?: string;
      state?: string;
      responseType?: string;
      xfbml?: boolean;
      cookie?: boolean;
      isMobile?: boolean;
      reAuthenticate?: boolean;
      disableMobileRedirect?: boolean;
      size?: 'small' | 'medium' | 'metro';
      buttonStyle?: React.CSSProperties;
      containerStyle?: React.CSSProperties;
    }
  
    const ReactFacebookLogin: React.FC<ReactFacebookLoginProps>;
  
    export default ReactFacebookLogin;
  }
  