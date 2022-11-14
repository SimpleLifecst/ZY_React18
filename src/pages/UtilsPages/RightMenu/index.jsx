import React from 'react';
import { Menu, Item, Separator, Submenu, MenuProvider, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'blahblah';

export default function RightMenu() {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event) {
    event.preventDefault();
    show(event, {
      props: {
        key: 'value'
      }
    })
  }
  const handleItemClick = ({ event, props }) => console.log(event, props);

  /**
   * 该组件存在一个小bug，当点击了右键菜单，菜单消失，会出现一段幻影菜单出现
   */
  return (
    <div onContextMenu={handleContextMenu} style={{"height": "100%", "boxShadow": "1px 1px 10px blue", "borderRadius": "5px"}}>
      <p>在该区域内，右键能唤醒您的菜单</p>
      <p>该组件存在一个小bug，当点击了右键菜单，菜单消失，会出现一段幻影菜单出现</p>
      <Menu id={MENU_ID}>
        <Item onClick={handleItemClick}>Item 1</Item>
        <Item onClick={handleItemClick}>Item 2</Item>
        <Separator />
        <Item disabled>Disabled</Item>
        <Separator />
        <Submenu label="Foobar">
          <Item onClick={handleItemClick}>Sub Item 1</Item>
          <Item onClick={handleItemClick}>Sub Item 2</Item>
        </Submenu>
      </Menu>
    </div>
  );
}