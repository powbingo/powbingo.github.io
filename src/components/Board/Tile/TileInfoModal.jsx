import React, { useMemo } from 'react';
import { Modal } from 'antd';

import '../Boards.css';
import { CheckCircleOutlined, FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useToggle from '../../../common/useToggle';
import ScreenshotModal from '../../ScreenshotModal/ScreenshotModal';
import UploadScreenshotModal from '../../UploadScreenshot/UploadScreenshotModal';

export default function TileInfoModal({
  visible,
  onClose,
  tile,
}) {
  const { toggle, isToggled } = useToggle();
  const { toggle: toggleUpload, isToggled: isUploadToggled } = useToggle();

  const activeTeam = useSelector(state => state.settings.activeTeam);
  const teamId = useSelector(state => state.settings.teamId);
  const teams = useSelector(state => state.settings.teams);
  const role = useSelector(state => state.settings.role);
  const board = useSelector(state => state.boards.board);

  const relevantTile = useMemo(() => (
    board?.reduce((acc, row) => [...acc, ...row], [])?.find(t => t.id === tile?.id)
  ), [board, tile]);

  const activeTeamName = useMemo(() => (
    teams.find(team => team.id === activeTeam)?.name || ''
  ), [teams, activeTeam]);

  console.log('teamId', teamId, 'activeTeam', activeTeam);

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        className="tile-info-modal"
      >
        <div className="tile-info-title ibm-plex-sans-medium">{tile?.name}</div>
        <div className="tile-info-sub-title ibm-plex-sans-medium">{activeTeamName}</div>
        <div className="tile-info-buttons">
          { role === 'captain' && (
            <div className='tile-info-primary-button primary'>
              <CheckCircleOutlined className="tile-info-button-icon" /> Submit for verification
            </div>
          )}
          {teamId === activeTeam && (
            <div className="tile-info-primary-button" onClick={toggleUpload}>
              <UploadOutlined className="tile-info-button-icon" /> Upload Screenshot
            </div>
          )}
          <div className={`tile-info-primary-button ${relevantTile?.images?.length ? '' : 'disabled'}`} onClick={toggle}>
            <FileImageOutlined className="tile-info-button-icon" /> {relevantTile?.images?.length ? 'View Screenshots' : 'No Screenshots'}
          </div>
        </div>
      </Modal>
      <ScreenshotModal
        visible={isToggled}
        onClose={toggle}
        tile={relevantTile}
      />
      <UploadScreenshotModal
        visible={isUploadToggled}
        onClose={toggleUpload}
        tile={relevantTile}
      />
    </>
  );
}
