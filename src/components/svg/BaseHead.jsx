import React from 'react';

import PROPS from '../../utils/properties/';
import DEFAULTS from '../../utils/properties/defaults';

function BaseHead({
  furColor = DEFAULTS.FUR,
  snoutColor = DEFAULTS.HEAD.SNOUT,
  noseColor = DEFAULTS.HEAD.NOSE,
  eyeColor = DEFAULTS.HEAD.EYES,
}) {
  const furColorClass = `fur-color-fill-${PROPS.FUR[furColor].id}`;
  const st2FurClass = `svg-base-head__st2 ${furColorClass}`;

  const snoutColorClass = `snout-color-fill-${PROPS.HEAD.SNOUT[snoutColor].id}`;
  const snoutClass = `svg-base-head__snout ${snoutColorClass}`;

  const noseColorClass = `nose-color-fill-${PROPS.HEAD.NOSE[noseColor].id}`;
  const noseClass = `svg-base-head__nose ${noseColorClass}`;

  const eyeColorClass = `eye-color-fill-${PROPS.HEAD.EYES[eyeColor].id}`;
  const pupilClass = `svg-base-head__pupil ${eyeColorClass}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      viewBox="0 0 1024 1024"
      className="svg-sprite"
    >
      <g id="_x2B_Head_copy">
        <g id="_x2B_Base_copy">
          <g id="head_1_">
            <path
              d="M396.5 340.4s-17-27.4-49-6.6c-32 20.7-16.4 64.8-16.4 64.8s15.3 47.3 58.5 30.3c43.2-17.1 6.9-88.5 6.9-88.5zM348.1 355.9s38-16.7 35.4 39.2"
              className="svg-base-head__st1"
            />
            <path
              d="M348.5 354.2c5.2-2.1 10.9-3.1 16.7-2.2 2.9.5 5.8 1.5 8.4 3 2.6 1.6 5 3.7 6.5 6.3 3.2 5.1 4.3 10.9 4.8 16.4.4 5.5.5 11 .2 16.4 0 .6-.8 1-1.7 1-.9 0-1.6-.5-1.6-1.1.2-5.3-.1-10.6-1.2-15.7-1-5.1-2.9-9.9-5.5-13.8-1.3-2-2.8-3.7-4.5-5.3-1.8-1.5-3.9-2.7-6.3-3.2-4.7-1.2-10-.7-14.9.8-.5.2-1.1-.3-1.4-1.1-.2-.5 0-1.3.5-1.5z"
              className="svg-base-head__st1"
            />
            <g>
              <path
                d="M373.9 358.6c-25 12.9-12.6 36.5-12.6 36.5M374.3 361.2c-2.7 1.9-5.1 4-7.3 6.2-2.1 2.2-3.7 4.9-4.8 7.7-1.1 2.8-1.6 6-1.7 9.2 0 3.2.7 6.6 2 9.6.1.3-.4.9-1.2 1.3-.8.4-1.6.4-1.8.1-1.6-3.4-2.6-6.8-3.3-10.5-.7-3.7-.6-7.6.5-11.4.5-1.9 1.4-3.7 2.4-5.4 1-1.7 2.2-3.2 3.5-4.7 2.7-2.8 6-4.9 9.4-6.3.6-.2 1.5.5 2 1.7.5 1.1.6 2.2.3 2.5z"
                className="svg-base-head__st1"
              />
            </g>
            <path
              d="M732.2 347.3c-10.6-88.8-33.9-202.6-186.4-208.6s-163.9 160.1-158.5 193 4.5 203.1 200.7 203.4c83 .1 166-5.4 144.2-187.8z"
              className="svg-base-head__st1"
            />
            <g>
              <path
                d="M727.3 465.5c-17.9-28.4-86.4-38.1-86.4-38.1-139.6-.2-171.3 42.9-178.7 72.2 28.7 21.1 69 35.4 125.8 35.5 58.9.1 117.9-2.7 139.3-69.6z"
                className="svg-base-head__st1"
              />
              <path
                d="M626.8 425.7s17.4-.6 19.9 4.4-13.6 33.3-21.7 33.3-26.5-29.8-22.9-34.3c3.7-4.5 21.8-3.4 24.7-3.4z"
                className="svg-base-head__st1"
              />
            </g>
            <g>
              <path
                d="M396.5 340.4s-17-27.4-49-6.6c-32 20.7-16.4 64.8-16.4 64.8s15.3 47.3 58.5 30.3c43.2-17.1 6.9-88.5 6.9-88.5z"
                className={st2FurClass}
              />
              <path d="M348.5 354.2c5.2-2.1 10.9-3.1 16.7-2.2 2.9.5 5.8 1.5 8.4 3 2.6 1.6 5 3.7 6.5 6.3 3.2 5.1 4.3 10.9 4.8 16.4.4 5.5.5 11 .2 16.4 0 .6-.8 1-1.7 1-.9 0-1.6-.5-1.6-1.1.2-5.3-.1-10.6-1.2-15.7-1-5.1-2.9-9.9-5.5-13.8-1.3-2-2.8-3.7-4.5-5.3-1.8-1.5-3.9-2.7-6.3-3.2-4.7-1.2-10-.7-14.9.8-.5.2-1.1-.3-1.4-1.1-.2-.5 0-1.3.5-1.5z" />
              <path d="M374.3 361.2c-2.7 1.9-5.1 4-7.3 6.2-2.1 2.2-3.7 4.9-4.8 7.7-1.1 2.8-1.6 6-1.7 9.2 0 3.2.7 6.6 2 9.6.1.3-.4.9-1.2 1.3-.8.4-1.6.4-1.8.1-1.6-3.4-2.6-6.8-3.3-10.5-.7-3.7-.6-7.6.5-11.4.5-1.9 1.4-3.7 2.4-5.4 1-1.7 2.2-3.2 3.5-4.7 2.7-2.8 6-4.9 9.4-6.3.6-.2 1.5.5 2 1.7.5 1.1.6 2.2.3 2.5z" />
              <path
                d="M732.2 347.3c-10.6-88.8-33.9-202.6-186.4-208.6s-163.9 160.1-158.5 193 4.5 203.1 200.7 203.4c83 .1 166-5.4 144.2-187.8z"
                className={st2FurClass}
              />
              <g>
                <path
                  d="M727.3 465.5c-17.9-28.4-86.4-38.1-86.4-38.1-139.6-.2-171.3 42.9-178.7 72.2 28.7 21.1 69 35.4 125.8 35.5 58.9.1 117.9-2.7 139.3-69.6z"
                  className={snoutClass}
                />
                <path
                  d="M626.8 425.7s17.4-.6 19.9 4.4-13.6 33.3-21.7 33.3-26.5-29.8-22.9-34.3c3.7-4.5 21.8-3.4 24.7-3.4z"
                  className={noseClass}
                />
              </g>
            </g>
            <g>
              <path d="M619.8 507c-3.4 1.2-6.9 1.9-10.4 2.4-3.5.4-7.1.7-10.7.5-3.6-.2-7.1-.6-10.6-1.3-3.5-.7-6.9-1.6-10.2-2.9-6.6-2.4-12.9-5.7-18.7-9.7-5.7-4-11.2-8.3-16.2-13.1-.5-.5-.5-1.5.2-2.1.6-.6 1.5-.7 2.1-.2 4.9 4.6 10.4 8.5 16.3 11.8 5.9 3.2 12 6 18.3 7.9 3.1 1 6.3 1.9 9.5 2.5 3.2.7 6.5 1 9.7 1.2 3.3.2 6.5.1 9.8-.1 3.2-.3 6.5-.7 9.7-1.4 1-.2 2.2.7 2.5 1.9.2 1.1-.3 2.3-1.3 2.6z" />
            </g>
            <g>
              <ellipse cx="506.6" cy="364.9" className="svg-base-head__eye" rx="70.6" ry="56.6" />
              <circle cx="495.3" cy="368.4" r="29.6" className={pupilClass} />
              <g>
                <ellipse cx="677.4" cy="364.9" className="svg-base-head__eye" rx="49.7" ry="56.6" />
                <circle cx="662.7" cy="369.2" r="24.9" className={pupilClass} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default BaseHead;
