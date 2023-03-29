import React, { ReactNode, SyntheticEvent } from "react";
import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId:
    "1051595715418-cnqs5sp0sshr4binv5h5is10n5u3eiff.apps.googleusercontent.com",
  apiKey: "AIzaSyDVfWRTwmX1cT6QBTLjkT0zWgtd9n_nzLs",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

export default class DoubleButton extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  public handleItemClick(event: SyntheticEvent<any>, name: string): void {
    if (name === "sign-in") {
      apiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      apiCalendar.handleSignoutClick();
    }
  }

  render(): ReactNode {
    return (
      <>
        <button onClick={(e) => this.handleItemClick(e, "sign-in")}>
          sign-in
        </button>
        <button onClick={(e) => this.handleItemClick(e, "sign-out")}>
          sign-out
        </button>
      </>
    );
  }
}
