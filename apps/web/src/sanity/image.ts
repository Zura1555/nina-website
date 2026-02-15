import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './client'

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
})

type ImageSource = Parameters<typeof imageBuilder.image>[0]

export const urlFor = (source: ImageSource) => {
    return imageBuilder.image(source)
}
