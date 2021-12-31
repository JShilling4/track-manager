import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class CategoryDto {
  @JsonProperty() docID?: string;
  @JsonProperty() name!: string;
}
