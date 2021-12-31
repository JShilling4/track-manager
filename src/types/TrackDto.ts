import { JsonProperty, Serializable } from "typescript-json-serializer";

@Serializable()
export class TrackDto {
  @JsonProperty() id?: string;
  @JsonProperty() docID!: string;
  @JsonProperty() artist!: string;
  @JsonProperty() bpm!: string | null;
  @JsonProperty() category!: string;
  @JsonProperty() key!: string | null;
  @JsonProperty() lastUpdated!: string;
  @JsonProperty() modifiedName!: string;
  @JsonProperty() notes!: string | null;
  @JsonProperty() originalName!: string;
  @JsonProperty() referenceLink!: string | null;
  @JsonProperty() url!: string;
}