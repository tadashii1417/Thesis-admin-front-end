import React, {Component} from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Popover} from "antd";

class MyCalendar extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({date})

    render() {
        return (
            <div>
                <ReactCalendar
                    onChange={this.onChange}
                    tileContent={<Popover
                        title="Events"
                        content={
                            <ul className={"Calendar__DayEventContainer"}>
                                <li>123</li>
                                <li>456</li>
                            </ul>
                        }
                    >
                        <span>12/3</span>
                    </Popover>}
                    value={this.state.date}
                />
            </div>
        );
    }
}

export default MyCalendar;