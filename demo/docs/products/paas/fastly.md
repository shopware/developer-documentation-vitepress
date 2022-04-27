# Fastly


1. Make sure you have at least Shopware 6.4.11.0
2. Make sure `FASTLY_API_TOKEN` and `FASTLY_SERVICE_ID` are set in the environment or contact Platform.sh when its missing.
3. Enable Fastly config in [`.platform.app.yaml`](.platform.app.yaml) by removing hashtag before `mv config/packages/fastly.yaml.dist config/packages/fastly.yaml`
4. Push the new config and Fastly is enabled