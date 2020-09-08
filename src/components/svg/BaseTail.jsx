import React from 'react';

import PROPS from '../../utils/properties/';
import DEFAULTS from '../../utils/properties/defaults';

function BaseTail({ furColor = DEFAULTS.FUR }) {
  const furClass = `fur-color-fill-${PROPS.FUR[furColor].id}`;
  const borderFurClass = `svg-base-tail__border ${furClass}`;
  const fillFurClass = `svg-base-tail__fill ${furClass}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      viewBox="0 0 1024 1024"
      className="svg-sprite"
    >
      <g id="_x2B_Tail_copy">
        <g id="_x2B_Base_copy">
          <g id="tail_1_">
            <path
              d="M571.5 738.2s-82.1 13.6-117.2-129.8S352.8 474 352.8 474s-132.6 76.5-194 0-26.6-193.6 35.6-232.4c143.5-89.5 312-43.7 378 95.7 79.8 169 79.3 310.6-.9 400.9z"
              className={borderFurClass}
            />
            <path
              d="M193.2 304.5s-25.9 41.1-24.8 62.9c0 0 11.3-15.5 20.2-17.1 0 0-12.1 29.6 3 52.1"
              className={fillFurClass}
            />
            <path d="M194.8 305.5c-2.9 4.8-5.6 9.8-8.1 14.9-2.6 5-5 10.1-7.1 15.3-2.2 5.2-4.1 10.4-5.6 15.7-.7 2.7-1.4 5.3-1.8 8-.4 2.7-.6 5.3-.5 7.8l-5.9-1.8c1.5-1.9 2.9-3.7 4.4-5.4 1.5-1.7 3.2-3.4 4.9-5.1 1.7-1.6 3.6-3.2 5.6-4.6 2.1-1.4 4.3-2.7 7.3-3.3 1.7-.3 3.4.8 3.8 2.5.1.6.1 1.3-.2 1.8v.1c-.4.9-.8 1.9-1.1 2.9-.3 1-.7 2-1 3.1-.6 2.1-1.1 4.2-1.5 6.3-.8 4.3-1.3 8.6-1.3 12.9 0 2.2.1 4.3.4 6.4.2 2.1.6 4.2 1.2 6.3 1.1 4.1 2.8 8.1 5.1 11.7.6 1 .3 2.3-.7 3-1 .6-2.3.3-2.9-.6-2.7-3.9-4.8-8.2-6.2-12.8-.7-2.3-1.2-4.6-1.6-6.9-.4-2.3-.6-4.7-.7-7-.2-4.7.1-9.4.8-14 .4-2.3.8-4.6 1.4-6.9.3-1.1.6-2.3.9-3.4.3-1.2.7-2.2 1.1-3.5l3.6 4.4c-1.5.3-3.2 1.2-4.8 2.3-1.7 1.1-3.3 2.5-4.8 3.9-1.5 1.5-3 3-4.5 4.6-1.4 1.6-2.8 3.3-4.1 5l-.1.1c-1.1 1.4-3.1 1.6-4.5.6-.8-.6-1.2-1.5-1.2-2.4-.1-3.2.3-6.3.9-9.2.6-2.9 1.4-5.8 2.3-8.6 1.8-5.6 4.1-10.9 6.5-16.2 2.4-5.2 5.1-10.3 7.9-15.3 2.8-5 5.7-9.9 8.8-14.8.6-.9 1.8-1.1 2.7-.6.9.7 1.2 1.9.6 2.8z" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default BaseTail;
