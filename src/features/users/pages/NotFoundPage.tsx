import { Result, Button } from 'antd'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Page not found."
      extra={
        <Link to="/users">
          <Button type="primary">Back to Users</Button>
        </Link>
      }
    />
  )
}
