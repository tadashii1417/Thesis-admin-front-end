import React from "react";
import {Comment, Avatar} from "antd";
import styles from "./Review.module.css";
import Rating from 'react-rating';
import {DEFAULT_SMALL_AVATAR} from "../../constants/dev_constant";
import {getDisplayName} from "../../utils/string_util";
import {formatTimeFromNow} from "../../utils/date_util";
import starIcon from "../../assets/images/star.png";
import fullStarIcon from "../../assets/images/filled-star.png";

export default function Review(props) {
    const {author, createdAt, rating, content} = props;
    const emptyIcon = <img alt="star" src={starIcon} width={15}/>;
    const fullIcon = <img alt="star" src={fullStarIcon} width={15}/>;

    return (
        <div className={styles.reviewContainer}>
            <div className={styles.authorContainer}>
                <Avatar src={(author.avatar != null && author.avatar["50x50"]) || DEFAULT_SMALL_AVATAR}
                        size={50}
                        alt={"Author's avatar"}/>
                <div className={styles.authorDetail}>
                    <div className={styles.author}>{getDisplayName(author)}</div>
                    <div>{formatTimeFromNow(createdAt)}</div>
                </div>
            </div >

            <div className={styles.feedbackContainer}>
                <Rating readonly={true}
                        initialRating={rating}
                        emptySymbol={emptyIcon}
                        fullSymbol={fullIcon}/>
                <div className={styles.content}>
                {content}
                </div>
            </div>

        </div>

    );
}
