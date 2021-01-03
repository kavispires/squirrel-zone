import React, { useCallback, useState } from 'react';

// Design Resources
import { Button, Divider, Input, Typography } from 'antd';
// State
import useDistributorState from '../../states/useDistributorState';
// Engine and utilities
import { Section, Line, Part, generateUniqueId } from '../../utils/distributor';
// Components
import Log from './Log';
const { Paragraph } = Typography;

function LyricsAndSections() {
  const [, setLines] = useDistributorState('lines');
  const [, setParts] = useDistributorState('parts');
  const [, setSections] = useDistributorState('sections');
  const [song] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');

  const [isBuiltOnce, setIsBuiltOnce] = useState(false);
  const [textarea, setTextarea] = useState('Sample lyrics\nSample lyrics\n\nSampleLyrics');

  const onTextareaChange = useCallback(
    (e) => {
      const { value } = e.target;
      setTextarea(value);
    },
    [setTextarea]
  );

  const buildSections = useCallback(() => {
    setSections([]);
    setLines([]);
    setParts([]);

    // Remove double spaces and first line and last line line breaks
    const filteredTextarea = textarea.split('\n').filter((entry, index, list) => {
      const line = entry.trim();
      // Empty lines
      if (line === '') {
        // First line
        if (index === 0) return false;
        // Last line is empty
        else if (index === list.length - 1) return false;
        // Double empty lines
        else if (list[index - 1]?.trim() === '') return false;
      }
      return true;
    });

    const tempSections = [];
    let tempSection = [];
    let newSectionId = generateUniqueId();

    filteredTextarea.forEach((entry, index, list) => {
      const line = entry.trim();
      if (line === '') {
        const newSection = new Section({ id: newSectionId, linesIds: tempSection, songId: song.id });
        tempSections.push(newSection);
        tempSection = [];
        newSectionId = generateUniqueId();
      } else {
        const newLine = new Line();
        // Split lines, create a part for each
        const parts = entry
          .split('|')
          .map((part) => {
            const text = part?.trim() ?? '';
            if (text) {
              return new Part({ text: text.trim(), lineId: newLine.id });
            }
            return null;
          })
          .filter((i) => i);

        newLine.deserialize({ placeholder: entry, partsIds: parts, sectionId: newSectionId });
        tempSection.push(newLine);
      }

      if (index === list.length - 1 && tempSection.length) {
        const newSection = new Section({ id: newSectionId, linesIds: tempSection, sectionId: newSectionId });
        tempSections.push(newSection);
      }
    });

    song.deserialize({ sectionsIds: tempSections });

    setIsBuiltOnce(true);
  }, [setLines, setParts, setSections, song, textarea]);

  return (
    <section className="lyrics-and-sections">
      <h2 className="lyrics-and-sections__title">Add Lyrics</h2>
      <Paragraph>
        Paste the lyrics and press enter to auto generate the sections and lines.
        <br />
        An line break creates a Line, a double line break generates a Section, and | generates parts.
      </Paragraph>

      <div className="lyrics-and-sections__container">
        <Input.TextArea
          placeholder="Insert lyrics here"
          className="lyrics-and-sections__textarea"
          onChange={onTextareaChange}
          defaultValue={textarea} // TODO: REMOVE
        />
        <Log className="lyrics-and-sections__log" defaultCompactSetting={false} />
      </div>

      <div className="lyrics-and-sections__action">
        {isBuiltOnce && (
          <Paragraph type="danger">
            Rebuilding the sections will reset all details you might have enter to Sections, Lines, and Parts.
          </Paragraph>
        )}
        <Button
          type={isBuiltOnce ? 'default' : 'primary'}
          danger={isBuiltOnce}
          onClick={buildSections}
          disabled={!textarea.length}
        >
          {isBuiltOnce ? 'Rebuild' : 'Build'} Sections
        </Button>
      </div>

      <Divider />

      {isBuiltOnce && (
        <div className="lyrics-and-sections__action">
          <Paragraph>Click on each section and each like to change their options.</Paragraph>
          <Button type="primary" onClick={() => setStep(2)}>
            Next Step
          </Button>
        </div>
      )}
    </section>
  );
}

export default LyricsAndSections;
