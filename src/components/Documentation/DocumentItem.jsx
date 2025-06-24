import React from 'react';
import ReactPlayer from 'react-player/vimeo';
import { NavLink } from 'react-router';

import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';

export const DocumentItem = ({ doc, onRemove }) => {
  return (
    <div className="w-full px-2">
      <div className="space-y-2 rounded-2xl border border-zinc-700 bg-zinc-900 p-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-green-500">
            {doc.title}
          </div>
          {doc?.allowEdit && (
            <div className="flex flex-row items-center gap-2">
              <NavLink
                to={`edit/${doc?.id}`}
                className="cursor-hover text-zinc-400 hover:text-white"
              >
                <EditSquareIcon sx={{ fontSize: 20 }} />
              </NavLink>
              <button
                onClick={() => onRemove && onRemove(doc.id)}
                className="cursor-hover text-zinc-400 hover:text-white"
                aria-label="Remove"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
        <div className="relative overflow-hidden">
          {doc?.kind === 'video' ? (
            <div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <ReactPlayer
                  url={doc.vimeoUrl}
                  controls
                  width="98%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </div>

              <div className="mt-3">
                <a
                  target="_blank"
                  href={doc.vimeoUrl}
                  className="link-hover text-white hover:text-green-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="green-400 text-sm font-bold">
                      View in Vimeo
                    </span>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
                <a
                  target="_blank"
                  href={doc?.scribeEmbedUrl}
                  // onClick={() => setOpenDocsDetails(doc)}
                  className="link-hover text-white hover:text-green-400"
                >
                  <div className="flex items-center gap-3">
                    <DescriptionIcon className="h-6 w-6 text-green-400" />
                    <span className="text-sm text-white">Click to open</span>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
