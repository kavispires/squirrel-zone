import React, { useCallback } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Divider, Tooltip, Progress, TimePicker } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';

function SongMetadata() {
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');

  const onValuesChange = useCallback(
    (data) => {
      song.deserialize(data);
    },
    [song]
  );

  return (
    <div className="song-metadata">
      <h2 className="song-metadata__title">Finish Song Metadata</h2>

      <Form
        layout="vertical"
        name="song-metadata"
        initialValues={{ ...song.data, tempo: song.data.tempo || 120 }}
        onValuesChange={onValuesChange}
        className="song-metadata-form"
        autoComplete="off"
        preserve={false}
      >
        <Form.Item label="Video ID" name="videoId" className="song-metadata__form-item">
          <Input />
        </Form.Item>

        <div className="song-metadata-form__items song-metadata-form__items--2">
          <Form.Item label="Song Title" name="title" className="song-metadata-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Version" name="version" className="song-metadata-form__item">
            <Input />
          </Form.Item>
        </div>

        <div className="song-metadata-form__items song-metadata-form__items--4">
          <Form.Item label="Duration" name="duration" className="song-metadata-form__item">
            <TimePicker format="mm:ss" />
          </Form.Item>

          <Form.Item label="Tempo" name="tempo" className="song-metadata-form__item">
            <InputNumber placeholder={120} formatter={(value) => `${value} bpm`} />
          </Form.Item>

          <Form.Item label="Ideal Group Size" name="idealGroupSize" className="song-metadata-form__item">
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Single/Title"
            name="isSingle"
            className="song-metadata-form__item"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </div>

        <div className="song-metadata-form__items song-metadata-form__items--4">
          <Form.Item label="Genre" name="genre" className="song-metadata-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Style" name="style" className="song-metadata-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Album ID" name="albumId" className="song-metadata-form__item">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Parts Count" name="partsCount" className="song-metadata-form__item">
            <Input disabled />
          </Form.Item>
        </div>
      </Form>

      <div className="song-metadata__actions">
        <Divider />
        <Tooltip title="Song Completion Rate">
          <Progress percent={song?.completion} />
        </Tooltip>
        <Divider />
        <div className="song-metadata__action">
          <Button type="primary" disabled={!song?.completion} onClick={() => setStep(5)}>
            Next Step: Save On Database
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SongMetadata;
