import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Lryic',
    Board: () => <div>
        <div className='flex'>
            <h1>LyriFusion</h1>
            <input placeholder="Name your project" />
        </div>

        <div className='flex flex-col'>
        <button>Start Creating</button>
        <button>Select Genre</button>
        </div>
    </div>,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 225,
        canvasWidth: 425
    }
});
