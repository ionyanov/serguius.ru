import { ChangeEvent, FC, useCallback } from 'react';
import { DriveFolderUpload } from '@mui/icons-material';
import { useUploadPictureMutation } from '../model/paimages.api';

interface PictureloadCardProps {
    category: string;
    refresh: () => void;
}

export const PictureloadCard: FC<PictureloadCardProps> = (args) => {
    const [uploadImage, uploadImageProps] = useUploadPictureMutation();

    const onFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            let selectedFiles = event.target.files;
            if (selectedFiles) {
                let fl: File | null = selectedFiles.item(0);
                if (fl) {
                    const formData = new FormData();
                    formData.append(`file`, fl);
                    uploadImage({
                        category: args.category,
                        data: formData,
                    }).then(() => {
                        if (args.refresh) {
                            args.refresh();
                        }
                    });
                }
            }
        },
        [args.category],
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
                style={{ display: 'none' }}
            />
            <DriveFolderUpload />
            Download
        </label>
    );
};
