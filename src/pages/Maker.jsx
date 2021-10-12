import React from 'react';

// Design Resources
import { Layout, Typography } from 'antd';

// Components
import Character from '../components/maker/Character';
import CharacterOptions from '../components/maker/CharacterOptions';
import { randomGroup } from '../utils/maker/names';

function Maker() {
  console.log(randomGroup(15));

  return (
    <Layout.Content className="container">
      <main className="main creator">
        <Typography.Title>Squirrel Maker</Typography.Title>
        <section className="section">
          <Character />
          <CharacterOptions />
        </section>
      </main>
    </Layout.Content>
  );
}

export default Maker;
