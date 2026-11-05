import os
import re

files_to_convert = [
    ('Toggle-switches', 'Creatlydev_wicked-bear-73.html', 'UivSwitch1', 'Estabilizador Giroscopico'),
    ('Toggle-switches', 'Custyyyy_strange-zebra-89.html', 'UivSwitch2', 'Sensor Atmosferico'),
    ('Toggle-switches', 'Darlley_jolly-yak-41.html', 'UivSwitch3', 'Travamento Orbital'),
    ('Toggle-switches', 'DawidMazurek4_tough-monkey-56.html', 'UivSwitch4', 'Filtro Polarizador'),
    ('Buttons', 'AKHILJITH-VN_curly-lionfish-0.html', 'UivBtn1', 'Disparo de Rota'),
    ('Buttons', 'Adir-SL_quiet-goose-19.html', 'UivBtn2', 'Iniciacao de Voo'),
    ('Buttons', 'Admin12121_cold-dodo-65.html', 'UivBtn3', 'Enlace de Satelite'),
    ('Buttons', 'Admin12121_lovely-cat-86.html', 'UivBtn4', 'Propulsao Vetorial'),
    ('Inputs', 'BurgiSimon_rotten-dolphin-78.html', 'UivInput1', 'Coordenadas GPS'),
    ('Inputs', 'Christardev_fat-donkey-71.html', 'UivInput2', 'Terminal de Frequencia'),
    ('Inputs', 'Cksunandh_purple-moose-3.html', 'UivInput3', 'Codigo de Manifesto'),
    ('loaders', 'Ankesh2002_lucky-cobra-80.html', 'UivLoader1', 'Radar de Altitude'),
    ('loaders', 'AqFox_clever-eel-67.html', 'UivLoader2', 'Buffer de Satelite'),
    ('loaders', 'AqFox_cuddly-turtle-6.html', 'UivLoader3', 'Varredura Termica'),
    ('Tooltips', 'TanimMahbub_white-fly-43.html', 'UivTooltip1', 'Telemetria Barometrica'),
    ('Tooltips', 'Tsiangana_honest-bobcat-61.html', 'UivTooltip2', 'Sensor de Pressao'),
    ('Cards', 'AmIt-DasIT_quick-frog-32.html', 'UivCard1', 'Credencial de Voo'),
    ('Cards', 'AnnixArt_wonderful-liger-82.html', 'UivCard2', 'Status de Cabine'),
    ('Radio-buttons', 'Pradeepsaranbishnoi_cuddly-sheep-92.html', 'UivRadio1', 'Modo Navegacao'),
    ('Radio-buttons', 'Pradeepsaranbishnoi_heavy-dragonfly-92.html', 'UivRadio2', 'Sensibilidade Piloto'),
    ('Checkboxes', 'Javierrocadev_itchy-shrimp-52.html', 'UivCheck1', 'Oxigenio Suplementar'),
    ('Checkboxes', 'JaydipPrajapati1910_odd-rat-12.html', 'UivCheck2', 'Carenagem Reforcada'),
]

base_dir = '/root/Evolução Inteligente/arsenal/uiverse-galaxy'
out_path = '/root/wanderlust-expeditions/src/components/uiverse-collection.tsx'

output = [
    'import React from "react";',
    '// 22 Scoped Instruments from Navigation Systems Suite',
    ''
]

def scope_css(css, scope_class):
    def replace_rule(match):
        selectors = match.group(1).strip()
        body = match.group(2)
        if selectors.startswith('@'):
            return f'{selectors} {{ {body} }}'
        scoped_selectors = []
        for s in selectors.split(','):
            s = s.strip()
            if s:
                scoped_selectors.append(f'.{scope_class} {s}')
        return f"{', '.join(scoped_selectors)} {{ {body} }}"

    scoped = re.sub(r'([^{}]+)\{([^{}]+)\}', replace_rule, css)
    return scoped

manifest_items = []

for idx, (cat, fname, comp_name, comp_title) in enumerate(files_to_convert):
    fpath = os.path.join(base_dir, cat, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    css = style_match.group(1) if style_match else ''
    html = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL).strip()

    prefix = f'uiv_{idx}_'
    scope_class = f'uiv_scoped_{idx}'

    classes = sorted(list(set(re.findall(r'\.([a-zA-Z0-9_\-]+)', css))), key=lambda x: -len(x))
    for c in classes:
        css = re.sub(r'\.' + re.escape(c) + r'(?=[^a-zA-Z0-9_\-]|$)', '.' + prefix + c, css)
        html = re.sub(r'class="([^"]*)\b' + re.escape(c) + r'\b([^"]*)"', r'class="\1' + prefix + c + r'\2"', html)
        html = re.sub(r"class='([^']*)\b" + re.escape(c) + r"\b([^']*)'", r"class='\1" + prefix + c + r"\2'", html)

    ids = sorted(list(set(re.findall(r'#([a-zA-Z0-9_\-]+)', css))), key=lambda x: -len(x))
    for id_val in ids:
        css = re.sub(r'#' + re.escape(id_val) + r'(?=[^a-zA-Z0-9_\-]|$)', '#' + prefix + id_val, css)
        html = re.sub(r'id="([^"]*)\b' + re.escape(id_val) + r'\b([^"]*)"', r'id="\1' + prefix + id_val + r'\2"', html)
        html = re.sub(r'for="([^"]*)\b' + re.escape(id_val) + r'\b([^"]*)"', r'for="\1' + prefix + id_val + r'\2"', html)

    css_scoped = scope_css(css, scope_class)

    html = html.replace('class=', 'className=')
    html = html.replace('for=', 'htmlFor=')
    html = html.replace('tabindex=', 'tabIndex=')
    html = html.replace('stroke-width=', 'strokeWidth=')
    html = html.replace('stroke-linecap=', 'strokeLinecap=')
    html = html.replace('stroke-linejoin=', 'strokeLinejoin=')
    html = html.replace('fill-rule=', 'fillRule=')
    html = html.replace('clip-rule=', 'clipRule=')
    html = html.replace('xmlns:xlink=', 'xmlnsXlink=')
    html = html.replace('xlink:href=', 'xlinkHref=')

    for tag in ['input', 'img', 'br', 'hr']:
        html = re.sub(r'(<' + tag + r'[^>]*?)(?<!/)>', r'\1 />', html)

    html = re.sub(r'\bchecked=""', 'defaultChecked', html)
    html = re.sub(r'\brequired=""', 'required', html)
    html = re.sub(r'\bchecked="checked"', 'defaultChecked', html)
    html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)
    html = re.sub(r'!Font Awesome[^\n<]+', '', html)

    css_escaped = css_scoped.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    html_escaped = html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

    comp_code = f"""
// --- {comp_name}: {comp_title} ---
export const {comp_name}: React.FC<{{ label?: string; onClick?: () => void; scale?: string }}> = ({{ label = "{comp_title}", onClick, scale = "scale-90" }}) => {{
  return (
    <div className="{scope_class} flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-400/40 backdrop-blur-md shadow-lg transition-all duration-300 w-full min-h-[140px] my-1 group" onClick={{onClick}}>
      <style>{{`{css_escaped}`}}</style>
      <div className="w-full flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-emerald-400/80 mb-2 border-b border-white/5 pb-1">
        <span className="truncate font-semibold">{{label}}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className={{`transform origin-center ${{scale}} max-w-full overflow-hidden flex items-center justify-center py-2`}} dangerouslySetInnerHTML={{{{ __html: `{html_escaped}` }}}} />
      <div className="w-full text-right text-[9px] font-mono text-white/40 mt-1">
        SYS-{idx+1:02d}
      </div>
    </div>
  );
}};
"""
    output.append(comp_code)
    manifest_items.append(f'  {{ id: "{comp_name}", Component: {comp_name}, title: "{comp_title}", category: "{cat}" }}')

output.append('export const INSTRUMENTATION_MANIFEST = [\n' + ',\n'.join(manifest_items) + '\n];\n')

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print(f'Done! Successfully generated {out_path} with 22 strictly scoped components.')
