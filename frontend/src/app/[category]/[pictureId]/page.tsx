/** @format */

import type { GetStaticProps, NextPage } from 'next';
//import { useRouter } from 'next/router'
//import Carousel from '../../components/Carousel'

/*const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults()

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  let fullPaths = []
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
*/

/** @format */

import { Stack } from '@mui/material';
import { getPictureById } from '@/api/getPictureById';
import { getAllPictures } from '@/api/getAllPictures';
import { PictureCard } from '@/components/PictureCard';

export async function generateStaticParams() {
	const pictures = await getAllPictures();

	return pictures.map((pic) => ({
		pictureId: pic.id.toString(),
	}));
}

interface PicturePageProps {
	params: { pictureId: string };
}

export default async function PicturePage(props: PicturePageProps) {
	const data = await getPictureById(+props.params.pictureId);

	if (!data) return <></>;
	return (
		<Stack direction={'column'} width={'99vw'} spacing={5} alignItems={'center'}>
			<PictureCard picture={data} />
		</Stack>
	);
}
