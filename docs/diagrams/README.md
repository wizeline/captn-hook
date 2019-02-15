## Rebuilding Diagrams

#### Install plantuml

```bash
npm install node-plantuml -g
```


#### Run the generate command

```bash
cd docs/diagrams
for i in *.puml ; do echo "${i%%.*}" ; puml generate "$i" -o "${i%%.*}".png  ; done
```

#### Update the versions

Commit your `puml` files along with the `png` files.
