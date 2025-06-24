import React, { useEffect, useState } from 'react';
import api from '~/core/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FieldError } from '../Form/FieldError';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

export const Form = ({ documentation }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState({});
  const [documentationMapsAttrs, setDocumentationMapsAttrs] = useState([]);
  const [formData, setFormData] = useState({
    id: documentation?.id || '',
    kind: documentation?.kind || '',
    title: documentation?.title || '',
    vimeoUrl: documentation?.vimeoUrl || '',
    scribeEmbedUrl: documentation?.scribeEmbedUrl || '',
    videoTranscript: documentation?.videoTranscript || '',
    scribeMarkdown: documentation?.scribeMarkdown || '',
  });

  const { data: documentationMaps, isLoading } = useQuery({
    queryKey: ['documentation_maps', formData.id],
    queryFn: () =>
      api
        .get(`/documentations/${formData.id}/documentation_maps`)
        .then((res) => res.data),
    enabled: !!formData.id,
  });

  const { mutate: formDocumentation } = useMutation({
    mutationFn: (formData) => {
      if (formData.id) {
        return api
          .put(`/documentations/${formData.id}`, formData)
          .then((res) => res.data);
      } else {
        return api.post('/documentations', formData).then((res) => res.data);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [name]: undefined });
  };

  const handleNested = (index, e) => {
    const newPath = e.target.value;

    setDocumentationMapsAttrs((prev) =>
      prev.map((item) =>
        item.index === index ? { ...item, path: newPath } : item,
      ),
    );
  };

  const handleAddNested = () => {
    setDocumentationMapsAttrs((prev) => [
      ...prev,
      { index: prev.length, path: '' },
    ]);
  };

  const handleRemoveNested = (index) => {
    setDocumentationMapsAttrs((prev) =>
      prev.map((item) =>
        item.index === index ? { ...item, destroy: true } : item,
      ),
    );
  };

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();

    const payload = {
      ...formData,
      documentation_maps_attributes: documentationMapsAttrs.map((dma) => ({
        id: dma.id,
        path: dma.path,
        _destroy: dma.destroy,
      })),
    };

    formDocumentation(payload, {
      onSuccess: () => {
        if (payload.id) {
          queryClient.invalidateQueries(['documentation', payload.id]);
          toast.success('Documentation was successfully updated.');
        } else {
          toast.success('Documentation was successfully created.');
        }

        navigate('/app/documentations');
      },
      onError: (error) => {
        setErrors(error.response.data.errors || {});
        toast.error('Unable to create documentation.');
      },
    });
  };

  useEffect(() => {
    if (documentationMaps) {
      const documentationMapsWithIndex = documentationMaps.map(
        (item, index) => ({
          index: index,
          ...item,
        }),
      );
      setDocumentationMapsAttrs(documentationMapsWithIndex);
    }
  }, [documentationMaps]);

  return (
    <section id="form-documentation">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="kind" className="label mb-1">
            Kind
          </label>
          <select
            name="kind"
            id="kind"
            value={formData.kind}
            onChange={handleChange}
            className="input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select</option>
            <option value="doc">Document</option>
            <option value="video">Video</option>
          </select>
          {errors.kind && <FieldError errors={errors.kind.join(', ')} />}
        </div>

        <div>
          <label htmlFor="title" className="label mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.title && <FieldError errors={errors.title.join(', ')} />}
        </div>

        <div>
          <label
            htmlFor={formData?.kind === 'doc' ? 'scribeEmbedUrl' : 'vimeoUrl'}
            className="label mb-1"
          >
            {formData.kind === 'doc' ? 'Scribe Embed Url' : 'Vimeo URL'}
          </label>
          <input
            type="text"
            name={formData?.kind === 'doc' ? 'scribeEmbedUrl' : 'vimeoUrl'}
            id={formData?.kind === 'doc' ? 'scribeEmbedUrl' : 'vimeoUrl'}
            value={
              formData.kind === 'doc'
                ? formData?.scribeEmbedUrl
                : formData.vimeoUrl
            }
            onChange={handleChange}
            className="input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.vimeo_url && (
            <FieldError errors={errors.vimeo_url.join(', ')} />
          )}
        </div>

        <div>
          <label htmlFor="videoTranscript" className="label mb-1">
            Transcript
          </label>
          <textarea
            name="videoTranscript"
            id="videoTranscript"
            value={formData.videoTranscript}
            onChange={handleChange}
            className="input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="scribe_markdown" className="label mb-1">
            Markdown
          </label>
          <textarea
            name="scribeMarkdown"
            id="scribeMarkdown"
            value={formData.scribeMarkdown}
            onChange={handleChange}
            className="input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            rows={3}
          />
        </div>

        <div className="rounded-lg p-4">
          <div className="mb-2 flex items-center gap-2">
            <label className="label">Paths</label>
            <button
              type="button"
              onClick={handleAddNested}
              className="btn-primary !rounded-full !px-2 !py-2"
              title="Adicionar Path"
            >
              <AddIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {!isLoading &&
              documentationMapsAttrs.length > 0 &&
              documentationMapsAttrs.map(
                ({ index, path, destroy }) =>
                  !destroy && (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={path}
                        onChange={(e) => handleNested(index, e)}
                        className="input flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        className="btn-destroy"
                        onClick={() => handleRemoveNested(index)}
                        title="Remover Path"
                      >
                        <RemoveCircleOutlineIcon sx={{ fontSize: 22 }} />
                      </button>
                    </div>
                  ),
              )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full rounded-lg py-3 text-lg font-semibold shadow-md transition hover:bg-blue-600"
        >
          Salvar
        </button>
      </form>
    </section>
  );
};
