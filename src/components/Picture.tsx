type PictureProps = {
  name: string
  alt: string
  width: number
  height: number
  className?: string
  eager?: boolean
}

export function Picture({ name, alt, width, height, className, eager = false }: PictureProps) {
  return (
    <picture>
      <source srcSet={`/media/${name}.avif`} type="image/avif" />
      <img
        src={`/media/${name}.webp`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
