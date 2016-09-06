## Frontpage react app

This is the deployable branch; see the `master` branch for code that should be examined.

## To deploy

```
git submodule update --init
AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... npm run deploy
```

## To update as the examples change

Hopefully just merging `master` and pulling in the submodule.
