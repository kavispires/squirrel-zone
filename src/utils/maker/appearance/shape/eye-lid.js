import React from 'react';

export const EYE_LID = {
  'EYE_LID.GROUP1.BASIC': {
    id: 'EYE_LID.GROUP1.BASIC',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP1',
    name: 'BASIC',
    rate: 16,
    value: () => (
      <g>
        <g></g>
      </g>
    ),
  },
  'EYE_LID.GROUP1.SERENE': {
    id: 'EYE_LID.GROUP1.SERENE',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP1',
    name: 'SERENE',
    rate: 12,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-15.3 0-29.4 4.1-40.8 10.9l82.6.7c-11.4-7.2-26-11.6-41.8-11.6z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M525.4 317.3c-1.5-1.1-3.1-2.2-4.7-3.3l-82.6-.7c-1.7 1-3.3 2.1-4.8 3.2-1.4 1-2.8 2.1-4 3.2l100.2.8c-1.4-1.1-2.7-2.2-4.1-3.2z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-11.2 0-21.5 4.6-29.5 12.2h59.1c-8.1-7.6-18.4-12.2-29.6-12.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M682.3 317.9c-1-1.1-2-2.2-3.1-3.2h-59.1c-1.1 1-2.1 2.1-3.1 3.2-.9 1-1.8 2.1-2.6 3.2h70.5c-.8-1.1-1.7-2.2-2.6-3.2z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP1.BORED': {
    id: 'EYE_LID.GROUP1.BORED',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP1',
    name: 'BORED',
    rate: 8,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-33 0-60.5 18.9-66.2 43.7l132.7 1c-5.2-25.2-33-44.7-66.5-44.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M545.9 350.5c-.1-1.1-.3-2.2-.5-3.2l-132.7-1c-.2 1.1-.5 2.1-.6 3.2-.2 1.1-.3 2.1-.4 3.2l134.5 1.1c-.1-1.2-.2-2.3-.3-3.3z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-23.2 0-42.5 19.6-45.9 45.2h91.8c-3.5-25.5-22.7-45.2-45.9-45.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M695.9 350.9c-.1-1.1-.2-2.2-.3-3.2h-91.8c-.1 1.1-.3 2.2-.3 3.2-.1 1.1-.1 2.2-.2 3.2h92.8c-.1-1.1-.1-2.1-.2-3.2z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP1.JUDGY': {
    id: 'EYE_LID.GROUP1.JUDGY',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP1',
    name: 'JUDGY',
    rate: 4,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M546.2 355.8c0-29.4-30.2-53.3-67.4-53.3-37.1 0-67.4 23.9-67.4 53.3 0 3.5.4 7 1.3 10.4l131.9 1c1.1-3.7 1.6-7.5 1.6-11.4z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M412.8 366.2c.3 1.1.6 2.2.9 3.2l1.2 3.3 127.4 1c.5-1.1.9-2.1 1.3-3.2s.7-2.1 1-3.2l-131.8-1.1z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M696.1 355.8c0-29.4-20.8-53.3-46.4-53.3s-46.4 23.9-46.4 53.3c0 4.1.4 8 1.2 11.9H695c.7-3.9 1.1-7.8 1.1-11.9z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M604.4 367.6c.2 1.1.5 2.2.7 3.2.3 1.1.6 2.2.9 3.2h87.2c.3-1.1.6-2.1.9-3.2.3-1.1.5-2.1.7-3.2h-90.4z"
          />
        </g>
      </g>
    ),
  },

  'EYE_LID.GROUP2.SHY': {
    id: 'EYE_LID.GROUP2.SHY',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP2',
    name: 'SHY',
    rate: 12,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 409.1c26.4 0 49.4-12.1 60.4-29.7H418.5c11 17.6 33.9 29.7 60.3 29.7z"
            class="st0"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M415.1 372.9c.5 1.1 1 2.2 1.5 3.2.6 1.1 1.2 2.2 1.9 3.2h120.8c.7-1.1 1.3-2.1 1.9-3.2.6-1.1 1.1-2.1 1.5-3.2H415.1z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 409.1c18.2 0 34-12.1 41.6-29.7H608c7.6 17.6 23.4 29.7 41.7 29.7z"
            class="st0"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M605.7 372.9c.3 1.1.7 2.2 1.1 3.2.4 1.1.8 2.2 1.3 3.2h83.2c.5-1.1.9-2.1 1.3-3.2s.7-2.1 1.1-3.2h-88z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP2.TIRED': {
    id: 'EYE_LID.GROUP2.TIRED',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP2',
    name: 'TIRED',
    rate: 9,
    value: (furColor) => (
      <g>
        <g>
          <path style={furColor} d="M478.8 409.1c12.8 0 24.7-2.8 34.9-7.7H444c10.1 4.9 22.1 7.7 34.8 7.7z" />
          <path
            className="svg-squirrel-basic-fill"
            d="M433.1 394.9c1.6 1.1 3.2 2.2 4.9 3.2 1.9 1.2 3.9 2.2 6 3.2h69.8c2.1-1 4.1-2.1 6-3.2 1.7-1 3.3-2.1 4.9-3.2h-91.6z"
          />
        </g>
        <g>
          <path style={furColor} d="M649.7 409.1c8.8 0 17-2.8 24.1-7.7h-48.1c6.9 4.9 15.2 7.7 24 7.7z" />
          <path
            className="svg-squirrel-basic-fill"
            d="M618.2 394.9c1.1 1.1 2.2 2.2 3.4 3.2 1.3 1.2 2.7 2.2 4.1 3.2h48.1c1.4-1 2.8-2.1 4.1-3.2 1.2-1 2.3-2.1 3.4-3.2h-63.1z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP2.SKEPTICAL': {
    id: 'EYE_LID.GROUP2.SKEPTICAL',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP2',
    name: 'SKEPTICAL',
    rate: 6,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-27.9 0-51.9 13.5-62.1 32.8l124.8 1c-9.9-19.8-34.3-33.8-62.7-33.8z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M543 339.4c-.4-1.1-.9-2.2-1.5-3.3l-124.8-1c-.6 1.1-1.1 2.1-1.5 3.2-.5 1.1-.9 2.1-1.3 3.2l130.2 1c-.3-.9-.7-2-1.1-3.1z"
          />
          <path
            style={furColor}
            d="M478.8 409.1c26.4 0 49.4-12.1 60.4-29.7H418.5c11 17.6 33.9 29.7 60.3 29.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M415.1 372.9c.5 1.1 1 2.2 1.5 3.2.6 1.1 1.2 2.2 1.9 3.2h120.8c.7-1.1 1.3-2.1 1.9-3.2.6-1.1 1.1-2.1 1.5-3.2H415.1z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 409.1c18.2 0 34-12.1 41.6-29.7H608c7.6 17.6 23.4 29.7 41.7 29.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M605.7 372.9c.3 1.1.7 2.2 1.1 3.2.4 1.1.8 2.2 1.3 3.2h83.2c.5-1.1.9-2.1 1.3-3.2s.7-2.1 1.1-3.2h-88z"
          />
          <path
            style={furColor}
            d="M649.7 302.4c-19.7 0-36.6 14.2-43.3 34.2H693c-6.7-19.9-23.6-34.2-43.3-34.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M694 339.9c-.3-1.1-.6-2.2-1-3.2h-86.7c-.4 1.1-.7 2.1-1 3.2-.3 1.1-.5 2.1-.8 3.2h90.2c-.2-1.1-.4-2.1-.7-3.2z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP2.UNSTABLE': {
    id: 'EYE_LID.GROUP2.UNSTABLE',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP2',
    name: 'UNSTABLE',
    rate: 3,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-32.1 0-59 17.9-65.7 41.7l131.8 1c-6.2-24.3-33.5-42.7-66.1-42.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M545.6 348.5c-.2-1.1-.4-2.2-.7-3.2l-131.8-1c-.3 1.1-.6 2.1-.8 3.2-.2 1.1-.4 2.1-.5 3.2l134.2 1.1c-.1-1.2-.3-2.3-.4-3.3z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-10.2 0-19.6 3.8-27.3 10.2h54.5c-7.6-6.4-17-10.2-27.2-10.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M680.4 315.9c-1.1-1.1-2.3-2.2-3.5-3.2h-54.5c-1.2 1-2.4 2.1-3.5 3.2-1 1-2 2.1-2.9 3.2h67.4c-1-1.1-1.9-2.2-3-3.2z"
          />
        </g>
      </g>
    ),
  },

  'EYE_LID.GROUP3.FEISTY': {
    id: 'EYE_LID.GROUP3.FEISTY',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP3',
    name: 'FEISTY',
    rate: 8,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-29.8 0-55.2 15.5-64 36.8l131.1 11.4c-3.3-27-32.1-48.2-67.1-48.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M546.1 353.9c0-1.1-.1-2.2-.3-3.3l-131.1-11.4c-.4 1-.8 2.1-1.2 3.2-.3 1-.6 2.1-.9 3.2L546 357.2v-1.4c.2-.6.2-1.3.1-1.9z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-24.9 0-45.3 22.6-46.4 50.9l91.2-11.4c-5.3-22.7-23.4-39.5-44.8-39.5z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M695.2 345.2c-.2-1.1-.4-2.1-.7-3.2l-91.2 11.4c0 .8-.1 1.6-.1 2.5v.8c0 1.1.1 2.2.1 3.3l92.3-11.5c-.1-1.2-.2-2.3-.4-3.3z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP3.ANGRY': {
    id: 'EYE_LID.GROUP3.ANGRY',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP3',
    name: 'ANGRY',
    rate: 6,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8,302.4c-7.7,0-15,1-21.9,2.9l73.1,15.8C517.7,309.7,499.3,302.4,478.8,302.4z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M534.2,325.4c-1.3-1.5-2.6-2.9-4.1-4.2l-73.1-15.8c-2.1,0.6-4.2,1.2-6.2,2c-1.8,0.7-3.6,1.4-5.3,2.2l91.9,19.9
		C536.4,328,535.3,326.7,534.2,325.4z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7,302.4c-15.7,0-29.5,9-37.9,22.6l61.9-15C666.6,305.3,658.4,302.4,649.7,302.4z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M676.9,312.7c-1.1-0.9-2.2-1.7-3.3-2.5l-61.9,15c-0.8,1.2-1.5,2.5-2.2,3.9c-0.6,1.2-1.2,2.5-1.8,3.8l72-17.4
		C678.9,314.4,677.9,313.5,676.9,312.7z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP3.SASSY': {
    id: 'EYE_LID.GROUP3.SASSY',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP3',
    name: 'SASSY',
    rate: 4,
    value: (furColor) => (
      <g>
        <g></g>
        <path
          style={furColor}
          d="M478.8 302.4c-11.4 0-22.2 2.3-31.7 6.3l80.7 10.6c-12.2-10.4-29.6-16.9-49-16.9z"
        />
        <path
          className="svg-squirrel-basic-fill"
          d="M532 323.1c-1.3-1.3-2.7-2.6-4.1-3.8l-80.7-10.6c-1.9.8-3.7 1.6-5.4 2.6-1.6.8-3.1 1.7-4.6 2.7l98.2 12.8c-1.1-1.3-2.2-2.5-3.4-3.7z"
        />
        <g>
          <ellipse style={furColor} cx="649.7" cy="355.8" rx="46.4" ry="53.3" />
          <path
            className="svg-squirrel-basic-fill"
            d="M645.4 382c-3.5-.5-7-1.1-10.5-1.9-3.5-.7-6.9-1.7-10.2-2.7-3.4-1-6.7-2.2-9.9-3.5-1.6-.6-3.2-1.3-4.8-2-.3-.1-.6-.3-.9-.4-.1-.1-.2-.1-.4-.2l85.3-31.6c-.6-2-1.2-4-2-5.9 0-.1-.1-.2-.1-.3l-81.7 30.2 2.7-3.3c2.2-2.6 4.5-5.1 6.8-7.6 2.4-2.4 4.8-4.8 7.4-7 2.5-2.3 5.2-4.4 7.9-6.4h.1c.8-.6 1-1.7.5-2.5-.6-.9-1.7-1.1-2.6-.6-3 1.9-5.9 3.8-8.7 6-2.8 2.1-5.6 4.3-8.2 6.7-2.7 2.3-5.2 4.8-7.7 7.3-1.7 1.7-3.2 3.4-4.8 5.2.1 1.5.3 3.1.6 4.6v.3l.6 3c0 .2.1.3.1.5.2.9.4 1.7.7 2.6 0 .1.1.2.1.3.5 1.8 1.1 3.5 1.8 5.2 1.7.6 3.5 1.2 5.2 1.7 3.5 1.1 7.1 2 10.7 2.8 3.6.7 7.2 1.4 10.8 1.9 3.6.5 7.2.8 10.9 1 .9.1 1.7-.6 1.8-1.5.1-.9-.6-1.8-1.5-1.9z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP3.VICIOUS': {
    id: 'EYE_LID.GROUP3.VICIOUS',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP3',
    name: 'VICIOUS',
    rate: 2,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M546.2 355.8c0-29.4-30.2-53.3-67.4-53.3-30.3 0-55.9 15.9-64.4 37.7l129.9 28.1c1.2-4 1.9-8.2 1.9-12.5z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M414.4 340.1c-.4 1-.7 2-1.1 3.1-.3 1-.6 2.1-.8 3.1l129.4 28c.5-1 .9-2 1.3-3s.7-2 1.1-3.1l-129.9-28.1z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-25.6 0-46.4 23.9-46.4 53.3 0 5.2.7 10.2 1.9 14.9l90.6-21.9c-3.1-26-22.6-46.3-46.1-46.3z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M696 352.1l-.3-3.3-90.6 21.9c.3 1.1.6 2.1.9 3.1.3 1 .7 2.1 1.1 3.1l89.1-21.5c-.1-1.2-.1-2.3-.2-3.3z"
          />
        </g>
      </g>
    ),
  },

  'EYE_LID.GROUP4.INSECURE': {
    id: 'EYE_LID.GROUP4.INSECURE',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP4',
    name: 'INSECURE',
    rate: 4,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-23.2 0-43.7 9.4-55.9 23.6l79.1-20.3c-7.2-2.1-15-3.3-23.2-3.3z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M507.7 307.6c-1.8-.7-3.7-1.3-5.7-1.9L423 326c-1.1 1.3-2.2 2.7-3.2 4.2-.9 1.3-1.7 2.6-2.5 4l95.4-24.5c-1.6-.8-3.3-1.5-5-2.1z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-7.9 0-15.4 2.3-21.9 6.3l58.9 14.9c-8.5-12.8-21.9-21.2-37-21.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M689.1 327.6c-.7-1.4-1.5-2.7-2.4-3.9l-58.9-14.9-3.6 2.4c-1.1.8-2.1 1.7-3.1 2.6l69.8 17.7c-.5-1.4-1.2-2.7-1.8-3.9z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP4.SAD': {
    id: 'EYE_LID.GROUP4.SAD',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP4',
    name: 'SAD',
    rate: 3,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-37.1 0-67.4 23.9-67.4 53.3 0 2.1.2 4.2.5 6.3l133.8-12.5c-3.9-26.4-32.4-47.1-66.9-47.1z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M546.1 352.8c-.1-1.1-.2-2.2-.4-3.2L412 362.1c.2 1.1.4 2.1.6 3.2.2 1.1.5 2.1.8 3.2L546.2 356v-.2c0-1 0-2-.1-3z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 302.4c-24.1 0-44 21.2-46.2 48.3l92.6 3.1c-.9-28.5-21.4-51.4-46.4-51.4z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M696.1 353.8l-92.6-3.1c-.1 1.1-.1 2.2-.2 3.2v3.2l92.7 3.1c.1-1.1.1-2.2.2-3.2v-1.3c-.1-.6-.1-1.2-.1-1.9z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP4.DEPRESSED': {
    id: 'EYE_LID.GROUP4.DEPRESSED',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP4',
    name: 'DEPRESSED',
    rate: 2,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-37.1 0-67.4 23.9-67.4 53.3 0 5.7 1.1 11.2 3.2 16.3l128.1-32.9c-8.6-21.2-34-36.7-63.9-36.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M544 342.3c-.3-1-.7-2-1.1-3.1l-128.1 32.9c.4 1 .9 2 1.4 3 .5 1 1 2 1.6 2.9l127.3-32.7c-.4-.9-.7-2-1.1-3z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M696.1 355.8c0-29.4-20.8-53.3-46.4-53.3-22.1 0-40.6 17.8-45.3 41.6l90.7 22.9c.7-3.6 1-7.4 1-11.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M604.4 344c-.2 1.1-.4 2.1-.5 3.2-.2 1.1-.3 2.2-.4 3.2l90.1 22.8c.3-1 .6-2.1.9-3.1.3-1 .5-2.1.7-3.2L604.4 344z"
          />
        </g>
      </g>
    ),
  },
  'EYE_LID.GROUP4.DAMAGED': {
    id: 'EYE_LID.GROUP4.DAMAGED',
    type: 'shape',
    category: 'EYE_LID',
    group: 'GROUP4',
    name: 'DAMAGED',
    rate: 1,
    value: (furColor) => (
      <g>
        <g>
          <path
            style={furColor}
            d="M478.8 302.4c-32.6 0-59.8 18.4-66 42.8l124.3-16.1c-11.6-15.9-33.4-26.7-58.3-26.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M539.2 332.1c-.6-1-1.3-2-2-3l-124.3 16.1c-.3 1.1-.5 2.2-.7 3.4-.2 1.1-.3 2.2-.4 3.3L541 335.2c-.6-1-1.2-2.1-1.8-3.1z"
          />
          <path
            style={furColor}
            d="M478.8 409.1c28.4 0 52.7-14 62.6-33.7H416.2c9.9 19.8 34.2 33.7 62.6 33.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M413.6 368.9c.4 1.1.8 2.2 1.2 3.2.4 1.1.9 2.2 1.5 3.2h125.2c.5-1.1 1-2.1 1.5-3.2.4-1.1.8-2.1 1.2-3.2H413.6z"
          />
        </g>
        <g>
          <path
            style={furColor}
            d="M649.7 409.1c19.6 0 36.4-14 43.2-33.7h-86.3c6.7 19.8 23.5 33.7 43.1 33.7z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M604.7 368.9c.2 1.1.5 2.2.8 3.2.3 1.1.7 2.2 1 3.2h86.3c.4-1.1.7-2.1 1-3.2.3-1.1.6-2.1.8-3.2h-89.9z"
          />
          <path
            style={furColor}
            d="M649.7 302.4c-17 0-31.9 10.6-40 26.2l85.6 17c-4.2-24.5-23-43.2-45.6-43.2z"
          />
          <path
            className="svg-squirrel-basic-fill"
            d="M695.7 349.1c-.1-1.1-.3-2.3-.5-3.4l-85.6-17c-.5 1-1 2-1.4 3-.4 1-.9 2-1.3 3.1l89 17.7c0-1.2 0-2.3-.2-3.4z"
          />
        </g>
      </g>
    ),
  },
};
