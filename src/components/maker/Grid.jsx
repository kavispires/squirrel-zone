import React from 'react';

function Grid() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" overflow="hidden" className="svg-grid" viewBox="0 0 1024 1024">
      <defs />
      <path d="M1024.4.9v1023.5H.9V.9h1023.5m.3-.2H.7v1024h1024V.7z" className="svg-grid__gray" />
      <path
        d="M.7 960.6h1024v.2H.7zM.7 896.6h1024v.2H.7zM.7 832.6h1024v.2H.7zM.7 768.6h1024v.2H.7zM.7 704.6h1024v.2H.7zM.7 640.6h1024v.2H.7zM.7 576.6h1024v.2H.7zM.7 512.6h1024v.2H.7zM.7 448.6h1024v.2H.7zM.7 384.6h1024v.2H.7zM.7 320.6h1024v.2H.7zM.7 256.6h1024v.2H.7zM.7 192.6h1024v.2H.7zM.7 128.6h1024v.2H.7zM.7 64.6h1024v.2H.7z"
        className="svg-grid__gray"
      />
      <path
        d="M960.6.7h.2v1024h-.2zM896.6.7h.2v1024h-.2zM832.6.7h.2v1024h-.2zM768.6.7h.2v1024h-.2zM704.6.7h.2v1024h-.2zM640.6.7h.2v1024h-.2zM576.6.7h.2v1024h-.2zM512.6.7h.2v1024h-.2zM448.6.7h.2v1024h-.2zM384.6.7h.2v1024h-.2zM320.6.7h.2v1024h-.2zM256.6.7h.2v1024h-.2zM192.6.7h.2v1024h-.2zM128.6.7h.2v1024h-.2zM64.6.7h.2v1024h-.2z"
        className="svg-grid__gray"
      />
      <path d="M.7.7l1024 1024M1024.2.2L.2 1024.2M512.2.2v1024M.2 512.2h1024" className="svg-grid__gray" />

      <path d="M959.4 64.9v894.5H64.9V64.9h894.5m.8-.7h-896v896h896v-896z" className="svg-grid__cyan" />
      <path d="M895.9 1.5v1022.4H129.5V1.5h766.4m.8-.8h-768v1024h768V.7z" className="svg-grid__cyan" />
      <path d="M1023.9 129.5v766.4H1.5V129.5h1022.4m.8-.8H.7v768h1024v-768z" className="svg-grid__cyan" />
    </svg>
  );
}

export default Grid;
