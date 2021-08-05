import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Button, Image, Row } from "antd";

const layout = {
  labelCol: {
    span: 6,
  },
};

const validateMessages = {
  required: "${label} is required!", // eslint-disable-line no-template-curly-in-string
};

const AddVideo = ({ onOk, onCancel }) => {
  const [bgUrl, setBgUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [thumbWidth, setThumbWidth] = useState(null);
  const [thumbHeight, setThumbHeight] = useState(null);
  const [bgWidth, setBgWidth] = useState(null);
  const [bgHeight, setBgHeight] = useState(null);
  const [thumbError, setThumbError] = useState(false);
  const onValuesChange = (changedValues) => {
    if (changedValues) {
      if (changedValues.background) {
        setBgUrl(changedValues.background);
      }
      if (changedValues.thumbnail) {
        setThumbUrl(changedValues.thumbnail);
      }
    }
  };

  const onLoad = (obj, isThumb) => {
    if (isThumb) {
      setThumbWidth(obj.target.naturalWidth);
      setThumbHeight(obj.target.naturalHeight);
    } else {
      setBgWidth(obj.target.naturalWidth);
      setBgHeight(obj.target.naturalHeight);
    }
  };

  const preview = (src, title, isThumb) =>
    <div style={{ width: "45%", margin: 5 }}>
      {isThumb && thumbError && <p style={{ color: "red" }}>Thumbnail dimensions must be at least 800x450 in 16:9 ratio</p> }
      {isThumb ?
        `${ title }: ${ thumbWidth && thumbHeight ? `${ thumbWidth }x${ thumbHeight }` : "" }` :
        `${ title }: ${ bgWidth && bgHeight ? `${ bgWidth }x${ bgHeight }` : "" }`
      }
      <br/>
      <Image
        onLoad={(obj) => { isThumb ? onLoad(obj, true) : onLoad(obj); }}
        src={src}
        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
      />
    </div>
  ;

  const onFinish = (values) => {
    var isThumbSizeValid = thumbWidth > 800 && thumbHeight > 450;
    var isThumbDimensionValid = thumbWidth % 16 === 0 && thumbHeight % 9 === 0;

    if (isThumbDimensionValid && isThumbSizeValid) {
      onOk(values);
    } else {
      setThumbError(true);
    }
  };

  return (
    <Modal title="Add Video" visible={true} onCancel={onCancel} footer={null}>
      <Form {...layout} onFinish={(values) => onFinish(values)} validateMessages={validateMessages} layout={"horizontal"} onValuesChange={onValuesChange}>
        <Form.Item
          name={"title"}
          label="Title"
          rules={[
            {
              required: true,
              max: 50
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={[
            {
              required: true,
              max: 200,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={"releaseDate"}
          label="Release Date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
        <Form.Item
          name={"thumbnail"}
          label="Thumbnail"
          rules={[
            {
              required: true,
              pattern: ".*https",
              message: "Must use https:// in url"
            },
          ]}
        >
          <Input placeholder="https://i.vimeocdn.com/video/956860457.jpg"/>
        </Form.Item>
        <Form.Item
          name={"background"}
          label="Background"
          rules={[
            {
              pattern: ".*https",
              message: "Must use https:// in url"
            },
          ]}
        >
          <Input placeholder="https://nolachurch.com/stream/backgrounds/bg.png"/>
        </Form.Item>
        <Form.Item
          name={"url"}
          label="Video link"
          rules={[
            {
              required: true,
              pattern: ".*https",
              message: "Must use https:// in url"
            },
          ]}
        >
          <Input.TextArea placeholder="https://player.vimeo.com/external/459995615.m3u8?s=f297dd991e728ff03e6c4119f9f0d10f23307d26"/>
        </Form.Item>
        <Form.Item
          name={"hours"}
          label="Hours"
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item
          name={"mins"}
          label="Minutes"
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item
          name={"secs"}
          label="Seconds"
        >
          <InputNumber/>
        </Form.Item>
        <Row>
          {preview(thumbUrl, "Thumbnail", true)}
          {preview(bgUrl, "Background")}
        </Row>
        <Button type="primary" htmlType="submit">
            Add Video
        </Button>
        <Button type="default" onClick={onCancel}>
            Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default AddVideo;
