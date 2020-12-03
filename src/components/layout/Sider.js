import React from 'react'
import { Menu } from 'antd';
import routes from '@/views'
import { NavLink } from 'react-router-dom'

const { SubMenu } = Menu;
const rootSubmenuKeys = ['10', '11', '12'];

export default props=>{

  //sider特效：一个展开一个收缩
  const [openKeys, setOpenKeys] = React.useState(['10']);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

    //封装一个生成菜单的小组件
    const createNavLink = ()=>{
    // exact=true，当url和NavLink.to 完全相等时才高亮
    // exact=flase，当url和NavLink.to 相似就高亮 
        return routes.map(ele=>(
          <SubMenu key={ele.id} title={ele.text} icon={<ele.icon/>}>
            {
              ele.children && ele.children.map(ele=>(
                <Menu.Item key={ele.id}>
                  <NavLink
                    to={ele.path}
                    exact={!ele.notExact}
                  >
                    {ele.text}
                  </NavLink>
                </Menu.Item>
              ))
            }
          </SubMenu>
        ))
      }
    return (
        <div className='qf-sider'>
           <Menu 
            mode="inline" 
            openKeys={openKeys} 
            onOpenChange={onOpenChange} 
            style={{ width: 150 }} 
            theme="dark"
           >
             { createNavLink() }
          </Menu>
        </div>
      )
    }