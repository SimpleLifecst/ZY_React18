import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { PROJECTTIMELINE } from './projectTimeline';

const Dashborad = () => {

  function handleProjectTimeline(timeline) {

    const newTimes = timeline.items.map(({ time, color, content }) => {
      return <Timeline.Item color={color} key={time} label={time}>{content}</Timeline.Item>
    })

    return [...newTimes, <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px', color: "green" }} />} key={timeline.conclusion.time} label={timeline.conclusion.time}>{timeline.conclusion.content}</Timeline.Item>]
  }

  return (
    <Timeline mode='right'>
      {
        PROJECTTIMELINE.map(item => {
          return handleProjectTimeline(item)
        })
      }
    </Timeline>
  );
}

export default Dashborad;
