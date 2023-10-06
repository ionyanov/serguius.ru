import { ChangeEvent, FC, useCallback } from 'react';
import { $api } from '@/shared/api/api';
import { DriveFolderUpload } from '@mui/icons-material';

interface PAImagesUploadCardProps {
    id: number;
    refresh: () => void;
}

export const PAImagesUploadCard: FC<PAImagesUploadCardProps> = (args) => {
    const onFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            let selectedFiles = event.target.files;
            if (selectedFiles) {
                const formData = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    let fl: File | null = selectedFiles.item(i);
                    if (fl) formData.append(`files`, fl);
                }
                const res = await $api.post(
                    `/images/${args.id}/upload`,
                    formData,
                );
                if (args.refresh) {
                    args.refresh();
                }
            }
        },
        [args.id],
    );

    return (
        <label
            style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid',
                padding: '5px 10px',
            }}>
            <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif"
                onChange={onFileChange}
                multiple
                style={{ display: 'none' }}
            />
            <DriveFolderUpload />
            Download
        </label>
    );
};
