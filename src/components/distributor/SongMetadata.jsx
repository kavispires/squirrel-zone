import React, { useCallback, useState } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Select, TimePicker } from 'antd';
// API
import API from '../../adapters';
// State
import useDistributorState from '../../states/useDistributorState';
import useLoadingState from '../../states/useLoadingState';
// Utilities
import { MUSIC_SCALE } from '../../utils/constants';
// Components
import StepTitle from './StepTitle';
import StepActions from './StepActions';
import SongProgress from './SongProgress';

function SongMetadata() {
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [isSongLoading] = useLoadingState('isSongLoading');

  const [success, setSuccess] = useState(false);

  const onValuesChange = useCallback(
    (data) => {
      song.deserialize(data);
    },
    [song]
  );

  const onSave = async () => {
    try {
      song.sort();
      await API.saveSong(song.serialize());
      setSuccess(true);
      setStep(0);
    } catch (_) {}
  };

  return (
    <div className="song-metadata">
      <StepTitle>Finish Song Metadata & Save</StepTitle>

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
          <Form.Item label="Scale" name="scale" className="song-metadata-form__item">
            <Select showSearch>
              {MUSIC_SCALE.map((chord) => (
                <Select.Option key={chord} value={chord}>
                  {chord}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Genre" name="genre" className="song-metadata-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Style" name="style" className="song-metadata-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Album ID" name="albumId" className="song-metadata-form__item">
            <Input disabled />
          </Form.Item>
        </div>
      </Form>

      <SongProgress />

      <StepActions>
        <Button type="primary" disabled={!song?.completion ?? isSongLoading ?? success} onClick={onSave}>
          Save On Database
        </Button>
      </StepActions>
    </div>
  );
}

export default SongMetadata;
