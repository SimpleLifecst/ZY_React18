import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'antd'
import { Link } from 'react-router-dom';
import { publish, subscribe, unsubscribe } from 'pubsub-js';
import { handleFileRename } from '../../../../apis/resourcesModule';

export default function RenameInput(props) {
  const { record: { name, id, parentId, resourceType } } = props;

  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef(null)
  const res = useState()

  const handleDoubleClick = () => {
    setIsInput(true)
    console.log(isInput);
    setTimeout(handleInputFocus, 100)
  }

  const handleInputFocus = () => {
    inputRef.current.focus({
      cursor: 'all',
    });
  }

  const handleKeywordEnter = async (e, isEnter) => {
    if (e.keyCode !== 13 && !isEnter) {
      return;
    }
    await handleFileRename(id, e.target.value)
    publish('handleUpdateListOfPubSub', parentId)
    setIsInput(false)
  }

  const handleClickName = () => {
    publish("handleUpdateListOfPubSub", id);
  }

  const handleInputBlur = (e) => {
    handleKeywordEnter(e, true)
  }

  useEffect(() => {
    const token = subscribe('RenameFileByPubSub', (_, record) => {
      if (record.id === id) handleDoubleClick()
    })

    return () => {
      unsubscribe(token)
    }
  }, []);

  return (
    <div onDoubleClick={handleDoubleClick} style={{ border: "1px dashed #f0f2f5", height: "100%" }}>
      {
        isInput ? 
        <Input 
          ref={inputRef} 
          onKeyUp={handleKeywordEnter} 
          onBlur={handleInputBlur} 
          defaultValue={name} 
          placeholder='请输入文件名' 
        /> : 
        <span>
          {
            resourceType === "DIRECTORY" ? <Link onClick={handleClickName}>{name}</Link> : name
          }
        </span>
      }
    </div>
  )
}
