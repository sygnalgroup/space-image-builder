import React, { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { formatDateSmart } from '~/core/utils/time';
import { colors } from '@mui/material';

const mockFiles = [
  {
    id: 'file-001',
    name: 'bug-report-agent-avatar.pdf',
    size: '2.4 MB',
    type: 'pdf',
    uploadDate: '2025-06-15T20:18:00Z',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'file-002',
    name: 'screenshot-of-the-issue.png',
    size: '890 KB',
    type: 'png',
    uploadDate: '2025-06-15T20:19:00Z',
    url: 'https://i.imgur.com/gT7h4A2.png',
  },
  {
    id: 'file-005',
    name: 'detalhes-interface.jpg',
    size: '1.2 MB',
    type: 'jpg',
    uploadDate: '2025-06-15T21:05:00Z',
    url: 'https://i.imgur.com/AdxxmDB.png',
  },
  {
    id: 'file-003',
    name: 'logs-export.zip',
    size: '15.7 MB',
    type: 'zip',
    uploadDate: '2025-06-15T20:25:00Z',
    url: '/downloads/logs.zip',
  },
];

const FileIcon = ({ type }) => {
  const iconProps = { sx: { fontSize: 28, color: colors.grey[400] } };
  switch (type.toLowerCase()) {
    case 'pdf':
      return <DescriptionIcon {...iconProps} />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return <ImageIcon {...iconProps} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <ArchiveIcon {...iconProps} />;
    default:
      return <InsertDriveFileIcon {...iconProps} />;
  }
};

const isImage = (fileType) =>
  ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileType.toLowerCase());

const TicketFiles = ({ files = mockFiles }) => {
  const [previewingImage, setPreviewingImage] = useState(null);

  const handlePreviewClick = (file) => {
    if (isImage(file.type)) {
      setPreviewingImage(file.url);
    } else {
      window.open(file.url, '_blank');
    }
  };

  return (
    <>
      <div className="w-full p-6 text-white">
        <div className="mb-6 flex items-center justify-between border-b border-zinc-700 pb-4">
          <h2 className="text-xl font-bold">Files</h2>
          <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm font-medium">
            {files.length} arquivo(s)
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 space-y-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 rounded-lg border border-transparent bg-zinc-800/50 p-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800"
              >
                <div className="flex-shrink-0">
                  {isImage(file.type) ? (
                    <button
                      onClick={() => handlePreviewClick(file)}
                      className="h-14 w-20 rounded-md bg-zinc-700"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </button>
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded-md bg-zinc-700">
                      <FileIcon type={file.type} />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-zinc-200">{file.name}</p>
                  <p className="text-sm text-zinc-400">
                    {formatDateSmart(file.uploadDate)} • {file.size}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button
                    onClick={() => handlePreviewClick(file)}
                    className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                    title="Pré-visualizar"
                  >
                    <VisibilityIcon sx={{ fontSize: 18 }} />
                  </button>
                  <a
                    href={file.url}
                    download
                    className="rounded-md bg-green-600 p-2 text-white transition-colors hover:bg-green-500"
                    title="Baixar"
                  >
                    <DownloadIcon sx={{ fontSize: 18 }} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 py-16 text-center">
              {/* ... (estado vazio sem mudanças) ... */}
            </div>
          )}
        </div>
      </div>
      {previewingImage && (
        <div
          onClick={() => setPreviewingImage(null)}
          className="bg-opacity-80 fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black transition-opacity duration-300"
        >
          <div className="relative">
            <button
              onClick={() => setPreviewingImage(null)}
              className="absolute -top-4 -right-4 z-10 rounded-full bg-zinc-600 p-1.5 text-white transition hover:bg-zinc-500"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
            <img
              src={previewingImage}
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
              className="block max-h-[85vh] max-w-[90vw] cursor-default rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TicketFiles;
