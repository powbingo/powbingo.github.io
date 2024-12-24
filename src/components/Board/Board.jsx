import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import './Boards.css';
import { getBoard } from './state/boards.actions';
import { BOARD_STATUSES } from './boards.contants';
import Tile from './Tile/Tile';
import TileInfoModal from './Tile/TileInfoModal';

const getAlphabet = (num) => {
  return String.fromCharCode(65 + num);
};

export default function Board({
  showLegend = true,
}) {
  const dispatch = useDispatch();

  const activeTeam = useSelector(state => state.settings.activeTeam);
  const board = useSelector(state => state.boards.board);

  const [selectedTile, setSelectedTile] = useState();
  const [shouldUpdate, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!activeTeam) return;
    dispatch(getBoard(activeTeam));
  }, [activeTeam])

  const {
    width,
    height,
    submittedNum = 0,
    verifiedNum = 0,
    inProgressNum = 0,
    totalNum = 0,
    tileWidth = 0,
  } = useMemo(() => {
    const boardHeight = board?.length || 0;
    const boardWidth = board?.[0]?.length || 0;
    let verified = 0;
    let submitted = 0;
    let inProgress = 0;

    board?.forEach((row) => {
      row?.forEach((tile) => {
        if (tile.status === BOARD_STATUSES.VERIFIED) {
          verified++;
        } else if (tile.status === BOARD_STATUSES.INPROGRESS) {
          inProgress++;
        } else if (tile.status === BOARD_STATUSES.SUBMITTED) {
          submitted++;
        }
      });
    });

    const bingoRow = document.querySelector('#bingo-row');
    let calculatedTileDimension = 0;

    if (!bingoRow) {
      setTimeout(() => {
        forceUpdate();
      });
    }

    if (bingoRow?.clientWidth && boardWidth) {
      calculatedTileDimension = Math.floor(
        (bingoRow?.clientWidth - (boardWidth * 40) - 65) / boardWidth
      );
    }

    return {
      width: [...new Array(boardWidth)],
      height: [...new Array(boardHeight)],
      totalNum: boardHeight * boardWidth,
      submittedNum: submitted,
      verifiedNum: verified,
      inProgressNum: inProgress,
      tileWidth: calculatedTileDimension,
    };
  }, [board, shouldUpdate]);

  window.onresize = () => {
    forceUpdate();
  }

  const onTileClick = (tile) => () => {
    setSelectedTile(tile);
  }

  if (!activeTeam) return null;

  return (
    <>
      <Row style={{ marginTop: 50 }}>
        <Col span={16} id="bingo-row">
          <Row style={{ width: '100%', marginLeft: 25 }}>
            {width.map((_, index) => (
              <div
                className="column-header ibm-plex-sans-medium"
                style={{ width: tileWidth + 40 }}
              >
                {getAlphabet(index)}
              </div>
            ))}
          </Row>
          { board?.map((row, index) => (
            <Row style={{ width: '100%' }}>
              <div
                className="row-header ibm-plex-sans-medium"
                style={{ height: tileWidth + 40, width: 10 }}
              >
                {index + 1}
              </div>
              {row?.map((tile) => (
                <Tile tile={tile} style={{ width: tileWidth, height: tileWidth, fontSize: Math.floor(tileWidth / 7) }} onClick={onTileClick(tile)} />
              ))}
            </Row>
          ))}
        </Col>
        {/* Dead col to keep in-line */}
        <Col span={8}></Col>
        <Col span={16} style={{ display: 'inline-flex', marginTop: 50, marginBottom: 10 }}>
          { showLegend && totalNum && (
            <div className="legend">
              <div className="ibm-plex-sans-medium legend-text">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" rx="3" fill="#179127"/>
                </svg>
                {verifiedNum}/{totalNum} verified
              </div>
              <div className="ibm-plex-sans-medium legend-text">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" rx="3" fill="#16581E"/>
                </svg>
                {submittedNum}/{totalNum} submitted
              </div>
              <div className="ibm-plex-sans-medium legend-text">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" rx="3" fill="#DA912C"/>
                </svg>
                {inProgressNum}/{totalNum} in progress
              </div>
            </div>
          )}
        </Col>
      </Row>
      <TileInfoModal
        visible={!!selectedTile}
        onClose={() => setSelectedTile(null)}
        tile={selectedTile}
      />
    </>
  )
}