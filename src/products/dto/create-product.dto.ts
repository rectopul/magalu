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
    value: string
    sale_value: string
    category: string
    categoriesId: string | null
    Attributes:  Attributes[]
    productImages: productImages[]
}
