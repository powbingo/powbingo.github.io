import React from 'react';
import '../Boards.css';
import { BOARD_STATUSES } from '../boards.contants';

export default function Tile({
  tile,
  style = {},
  onClick
}) {
  const getTileClass = (tile) => {
    switch (tile.status) {
      case BOARD_STATUSES.VERIFIED:
        return 'verified-tile';
      case BOARD_STATUSES.SUBMITTED:
        return 'submitted-tile';
      case BOARD_STATUSES.REJECTED:
        return 'rejected-tile';
      case BOARD_STATUSES.INPROGRESS:
        return 'in-progress-tile';
      default:
        return '';
    }
  }

  return (
    <>
      <div
        className={`tile ibm-plex-sans-medium ${getTileClass(tile)}`}
        style={{ ...style}}
        onClick={onClick}
      >
        { tile.name }
      </div>
    </>
  );
}