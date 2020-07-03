import React, {Component} from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Icon as AIcon, Popover, message, Divider} from "antd";
import styles from './Calendar.module.css';
import {formatEventGroupKey} from "../../utils/date_util";
import {getModuleEvents} from "../../services/event_service";
import {EventType, ModuleEventSubtype} from "../../constants/event_constant";
import moment from "moment";
import Loading from "../Loading/Loading";

class MyCalendar extends Component {
    state = {
        eventMap: [],
        loading: true
    }

    async componentDidMount() {
        await this.fetchMonthViewEvents(new Date());
    }

    fetchMonthViewEvents = async (dayOfMonth) => {
        try {
            const {data: map} = await getModuleEvents(dayOfMonth);
            this.setState({eventMap: map, loading: false});
        } catch (e) {
            message.error("Something went wrong");
        }
    }

    renderEvent = (e) => {
        console.log("event", e);

        const {instanceData, startAt} = e;
        if (!instanceData) return null;
        const {subtype, moduleTitle, courseName, startTime, endTime} = instanceData;

        if (e.type === EventType.TIMETABLE) {
            return (
                <div className={styles.eventContainer}>
                <span>
                    Lớp học offline diễn ra vào lúc <b>{startTime}</b> và kết thúc lúc <b>{endTime}</b>.
                </span>
                </div>
            );
        }

        let text = null;
        switch (subtype) {
            case ModuleEventSubtype.LIVESTREAM_START:
                text = "bắt đầu lúc";
                break;
            case ModuleEventSubtype.QUIZ_OPEN:
                text = "bắt đầu lúc";
                break;
            case ModuleEventSubtype.QUIZ_CLOSE:
                text = "kết thúc lúc";
                break;
            case ModuleEventSubtype.ASSIGNMENT_OPEN:
                text = "kết thúc lúc";
                break;
            case ModuleEventSubtype.ASSIGNMENT_CLOSE:
                text = "kắt đầu lúc";
                break;
            default:
                return null;
        }

        return (
            <div className={styles.eventContainer}>
                <span>
                    <b>{moduleTitle}</b> trong <b>{courseName}</b> {text} <b>{moment(startAt).format("HH:mm")}</b>
                </span>
            </div>
        );
    }

    onChangeDate = date => this.setState({date})

    renderTileContent = ({date, view}) => {
        if (view !== "month") return null;

        const k = formatEventGroupKey(date);
        const {eventMap} = this.state;
        if (!eventMap[k]) return "";

        return (
            <Popover
                title="Events"
                content={<ul className={styles.eventsContainer}>
                    {eventMap[k].map(e => (
                        <li>{this.renderEvent(e)}</li>
                    ))}
                </ul>}
            >
                <AIcon className={styles.dayIcon}
                       theme={"twoTone"} type="calendar" twoToneColor={"#d10000"}/>
            </Popover>
        );
    }


    render() {
        if (this.state.loading) return <Loading/>;

        return (
            <div>
                <h4>My Calendar</h4>
                <Divider/>
                <ReactCalendar
                    onChange={this.onChangeDate}
                    onClickMonth={this.fetchMonthViewEvents}
                    tileContent={this.renderTileContent}
                    value={this.state.date}
                    className={styles.calendar}
                />
            </div>
        );
    }
}

export default MyCalendar;
