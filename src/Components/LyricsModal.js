import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'react-bootstrap';

function Lyrics({lyrics,openLyrics}) {
    console.log(openLyrics)

  return (
    <Modal show={true} style={{opacity: "0.8",height: "70%"}}>
        <ModalBody>
    <div className='text-center' style={{whiteSpace: "pre",opacity:"0.8"}}>
        {lyrics}
    </div>
    </ModalBody>
    </Modal>
  );
}

export default Lyrics;