import React from 'react';
import { useHistory } from "react-router-dom";
import { 
  Row, Button, Card, Typography,
} from "antd";
const { Title } = Typography;

const NotFound = () => {
  const history = useHistory();

  return (
    <Row className="center-container" align="middle" justify="center">
      <Card style={{ width: 500 }}>
        <Title level={2}>Page is not found</Title>
        <Button type="primary" htmlType="submit" onClick={() => history.push('/')}>
          Back to mainpage
        </Button>
      </Card>
    </Row>
  )
}

export default NotFound;
