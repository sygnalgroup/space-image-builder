import React, { useRef, useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { EmojiEmotions } from '@mui/icons-material';
import EmojiPicker, { Theme } from 'emoji-picker-react';

const EmojiSelector = ({ setValue }) => {
  const btnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onEmojiClick = (emojiObject) => {
    setValue(emojiObject.emoji);
    setIsOpen(false);
  };
  return (
    <Box>
      {isOpen && (
        <div className="absolute bottom-16">
          <EmojiPicker theme={Theme.DARK} onEmojiClick={onEmojiClick} />
        </div>
      )}
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Box>
          <button
            type="button"
            className="cursor-pointer text-gray-400 hover:text-gray-100"
            onClick={() => setIsOpen(true)}
          >
            <EmojiEmotions ref={btnRef} style={{ fontSize: 26 }} />
          </button>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default EmojiSelector;
