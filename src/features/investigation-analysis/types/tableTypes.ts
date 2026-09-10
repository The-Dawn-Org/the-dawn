export interface Column<T> {
    key: string;
    display: string;
    render: (subject: T) => React.ReactNode;
    color?: (subject: T) => string | undefined;
}

export interface InterceptionEvent {
    eventId: number;
  
    interceptor: {
      interceptorTypeId: number;
      type: string;
      price: number;
    };
  
    launcher: {
      launcherId: number;
      location: {
        lat: number;
        lng: number;
      };
    };
  
    region: string;
    time: string;
  
    eventLocation: {
      lat: number;
      lng: number;
    };
  
    interceptionStatus: string;
    droneInjuryCount: number;
    eventStatus: string;
    attackingBody: string;
  
    drone: {
      type: string;
      price: number;
    };
  }