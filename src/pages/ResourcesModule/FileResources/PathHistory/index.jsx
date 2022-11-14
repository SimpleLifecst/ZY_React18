import { Breadcrumb } from 'antd'
import { publish } from 'pubsub-js'

export default function PathHistory(props) {

  const { pathList } = props;

  const handleUpdaeList = (parentId) => {
    publish('handleUpdateListOfPubSub', parentId)
  }

  return (
    <div className="path-history">
      <Breadcrumb>
        <Breadcrumb.Item key="0">
          <a onClick={() => handleUpdaeList(0)}>根目录</a>
        </Breadcrumb.Item>
        {
          pathList.map(item => {
            return (
              <Breadcrumb.Item key={item.id}>
                <a onClick={() => handleUpdaeList(item.id)}>{item.name}</a>
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    </div>
  )
}
