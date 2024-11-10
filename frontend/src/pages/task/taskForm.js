import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";

const TaskForm = ({ handleSubmit, viewData }) => {
  const [form] = Form.useForm();
  console.log(viewData, "viewData");

  useEffect(() => {
    if (viewData?.id) form.setFieldsValue(viewData);
    else form.resetFields();
  }, [viewData]);

  return (
    <div>
      <>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={{
            id: viewData?.id,
            title: viewData?.title,
            description: viewData?.description,
            completed: viewData?.completed,
          }}
          clearOnDestroy={true}
        >
          <Form.Item
            name="title"
            label="Title:"
            rules={[
              {
                required: true,
                message: "Title is required",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description:"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Task Completed?</Checkbox>
          </Form.Item>

          <Form.Item className="btn">
            <Button type="primary" htmlType="submit">
              {viewData?.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </>
    </div>
  );
};

export default TaskForm;
