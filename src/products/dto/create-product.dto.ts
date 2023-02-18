export type Attributes = {
    name: string
    value: string
    productsId: string | null
}

export type productImages = {
    name: string
    url: string
    productsId: string | null
}

export class CreateProductAttributesDto {
    Attributes:  Attributes[]
    productImages: productImages[]
}

export class CreateProductDto {
    name: string
    description: string
    Attributes:  Attributes[]
    productImages: productImages[]
}
