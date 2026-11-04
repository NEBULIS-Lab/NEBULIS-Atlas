# 内容来源与核对记录

核对日期：2026-11-04。内容入口：[catalog.json](../content/catalog.json)。

目录包含 **66 个资源节点、5 条建议路线、15 个术语**，其中 DS01–DS11 提供数据类型、规模、获取方式和推荐用途。标题使用英文名称，简介与学习要点为编辑撰写的中文导读。资源 ID 固定，入口、方法、数据与基准可以指向同一原始项目，但不会被当作不同研究成果。

## 编辑约定

- 只收录指定资源与获准使用的实验室公开材料，不按关键词补充无关论文。
- `prerequisites` 表示建议先掌握的基础；`related` 表示相关研究、数据或工具，不等同于学术依赖。路线也是建议阅读顺序，不是强制前置关系。
- R01 使用 `aliasOf: S02`：同一 robomimic 资源分别提供入门和 BC 深入视角；路线不会重复计数。
- 论文通常采用所链接预印本或正式版本的年份。DreamerV3 使用 Nature 2025 正式版本，ManiSkill 3 使用 RSS 2025 版本；仓库维护时间不替代论文年份。
- 不把论文发布时的模型称作仓库当前最新版，不录入容易过期的排名、星标或吞吐数字。
- 数据规模除已直接核实的示例外使用定性描述。下载入口可公开访问不等于数据无需许可；获取方式按资源自己的说明表述。
- 链接使用原作者、官方项目、官方仓库或正式出版页面，去除跟踪参数。页面本身不增加登录、社区或数据下载后台。

## 实际核对范围

对初稿的 115 个不同链接执行了 HTTP GET，读取网页标题；对 arXiv 页面读取了摘要，并逐项比对方法简介。随后针对异常链接与新增来源做了定向复核。下表记录最终目录的所有不同链接；HTTP 可达性与内容核对分开记录，未把收到 HTTP 200 当作论文全文已读。

浏览检索进一步读取了以下第一手内容：

| 范围 | 内容证据与核对结论 |
| --- | --- |
| S02 / DS01 | [robomimic 数据文档](https://robomimic.github.io/docs/datasets/overview.html)确认 HDF5 轨迹结构、观测、动作与数据处理流程。 |
| R02 / DS02 | [ALOHA 官方页](https://tonyzhaozh.github.io/aloha/)确认 ACT 的动作分块、条件 VAE 和时间集成，以及 ALOHA 遥操作硬件身份；不混入 Mobile ALOHA。 |
| E06 | [CoRL / PMLR 305](https://proceedings.mlr.press/v305/black25a.html)确认 π0.5 标题、2025 年份及异构数据联合训练。 |
| E08 | [GR00T 官方仓库](https://github.com/NVIDIA/Isaac-GR00T)在核对时已显示后续 N1.7；卡片仍明确指向 N1 原论文。 |
| W00 | [OpenReview PDF 的搜索索引](https://openreview.net/pdf?id=BZ5a1r-kVsf)包含作者、2022-06-27 版本与研究愿景摘要；直接论坛与 PDF 请求遇到验证页面或 403。没有声称直接完整读取了正文。 |
| W04–W06 | arXiv 摘要确认 V-JEPA 2 的视频预训练与动作条件后训练、LeWM 的表征预测和分布正则、V-JEPA 2.1 的密集预测及多层自监督。 |
| M04 / DS08 / B08 | [Meta 研究页](https://ai.meta.com/research/publications/partnr-a-benchmark-for-planning-and-reasoning-in-embodied-multi-agent-tasks/)、[论文](https://arxiv.org/abs/2411.00081)和[官方仓库](https://github.com/facebookresearch/partnr-planner)确认 PARTNR 的任务约束、家庭协作场景和 100,000 个自然语言任务。 |
| M05 / DS07 / B06 | [RoboTwin 2.0 论文](https://arxiv.org/abs/2506.18088)明确 RoboTwin-OD 是物体资产库；双臂操作不自动等于独立多智能体控制。 |
| DS05 | [DROID 官方文档](https://droid-dataset.github.io/droid/the-droid-dataset)确认 RLDS / 原始视频两种用途，以及 100 条调试样本入口。 |
| DS06 | [MimicGen 正确数据文档](https://mimicgen.github.io/docs/datasets/mimicgen_corl_2023.html)确认 source、core、object、robot 等数据类型和官方下载脚本。初稿猜测的 `datasets/overview.html` 返回 404，已替换。 |
| DS11 | [FedScale 官方 README](https://github.com/SymbioticLab/FedScale)确认数据、客户端分区和运行平台；项目域名发生 TLS 超时，卡片改用已返回 200 的[仓库数据目录](https://github.com/SymbioticLab/FedScale/tree/master/benchmark/dataset)。 |
| SIM02 / SIM03 | [Isaac Lab 首次正式发布说明](https://github.com/isaac-sim/IsaacLab/discussions/572)确认 2024 年发布；[ManiSkill 仓库](https://github.com/mani-skill/ManiSkill)确认 ManiSkill 3 及 RSS 2025 引用。 |
| B04 | [RoboCasa 官方页](https://robocasa.ai/)确认 365 个任务；[榜单](https://robocasa.ai/leaderboard)核对时展示 50 个评测任务。卡片明确区分平台全集与榜单协议，没有复制动态名次。直接 GET 的 TLS 失败不影响本次浏览工具读取到的内容记录。 |
| D01 / D02 / D04 | [USENIX](https://www.usenix.org/conference/osdi18/presentation/moritz)、[FedAvg PMLR](https://proceedings.mlr.press/v54/mcmahan17a.html)、[FedScale PMLR](https://proceedings.mlr.press/v162/lai22a.html)确认题名、年份与摘要。FedAvg 的 Flower 链接明确标为框架实现，而非原作者代码。 |
| F01 / F02 / F04 | 实验室公开项目页、公开仓库与 arXiv 摘要互相核对；BAS-VLA 使用现行 Beyond-Appearance-Shifts URL。D-JEPA 的论文和仓库链接从其公开项目页取得。 |
| F05 | [HKUST 官方研究记录](https://researchportal.hkust.edu.hk/en/publications/state-of-the-union-towards-reproducible-performance-evaluations-i/)确认题名、作者、IEEE TKDE 2026、DOI 和 Plato 统一评估框架；作者 PDF 返回 200。 |

## 实验室公开材料

使用获准复用的实验室网站仓库公开内容：`data/publications.json`，以及 `data/projects/beyond-appearance-shifts-project-2026.json`、`d-jepa-project-2026.json`、`brace-project-2026.json`。这些材料仅提供公开研究介绍和链接。

F03 **VLA-Fabric** 仅有用户指定的方向名称，本次未发现专属公开论文、仓库或日期。保留用户提供的协作研究方向描述，`year: null`，链接指向实验室项目总览；不编造专属论文、实现、发表状态或实验成绩。

## 最终链接核对表

“标题核对”指实际读取并检查页面身份；“摘要核对”还包含所提取的方法摘要。仓库不会因为返回 200 就被视为安装、训练或复现成功。核对未执行任何资源的模型训练、数据下载或仿真实验。

| 资源 ID | 第一手链接 | 本次实际结果 |
| --- | --- | --- |
| S01 | [[1707.06347] Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347) | HTTP 200；题名与摘要核对 |
| S02, R01 | [[2108.03298] What Matters in Learning from Offline Human Demonstrations for Robot Manipulation](https://arxiv.org/abs/2108.03298) | HTTP 200；题名与摘要核对 |
| S02, R01, DS01 | [GitHub - ARISE-Initiative/robomimic: robomimic: A Modular Framework for Robot Learning from Demonstration · GitHub](https://github.com/ARISE-Initiative/robomimic) | HTTP 200；标题 / 入口身份核对 |
| S02 | [Getting Started — robomimic 0.5 documentation](https://robomimic.github.io/docs/introduction/getting_started.html) | HTTP 200；标题 / 入口身份核对 |
| S03, E07 | [GitHub - huggingface/lerobot: 🤗 LeRobot: Making AI for Robotics more accessible with end-to-end learning · GitHub](https://github.com/huggingface/lerobot) | HTTP 200；标题 / 入口身份核对 |
| S03 | [LeRobot · Hugging Face](https://huggingface.co/docs/lerobot) | HTTP 200；标题 / 入口身份核对 |
| S04, SIM01 | [GitHub - google-deepmind/mujoco: Multi-Joint dynamics with Contact. A general purpose physics simulator. · GitHub](https://github.com/google-deepmind/mujoco) | HTTP 200；标题 / 入口身份核对 |
| S04, SIM01 | [Overview - MuJoCo Documentation](https://mujoco.readthedocs.io/en/stable/overview.html) | HTTP 200；标题 / 入口身份核对 |
| R02 | [[2304.13705] Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705) | HTTP 200；题名与摘要核对 |
| R02, DS02 | [GitHub - tonyzhaozh/act · GitHub](https://github.com/tonyzhaozh/act) | HTTP 200；标题 / 入口身份核对 |
| R02, DS02 | [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://tonyzhaozh.github.io/aloha/) | HTTP 200；标题 / 入口身份核对 |
| R03 | [[2303.04137] Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://arxiv.org/abs/2303.04137) | HTTP 200；题名与摘要核对 |
| R03 | [GitHub - real-stanford/diffusion_policy: [RSS 2023] Diffusion Policy Visuomotor Policy Learning via Action Diffusion · GitHub](https://github.com/real-stanford/diffusion_policy) | HTTP 200；标题 / 入口身份核对 |
| R03 | [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/) | HTTP 200；标题 / 入口身份核对 |
| R04 | [[2310.17596] MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations](https://arxiv.org/abs/2310.17596) | HTTP 200；题名与摘要核对 |
| R04, DS06 | [GitHub - NVlabs/mimicgen: This code corresponds to simulation environments used as part of the MimicGen project. · GitHub](https://github.com/NVlabs/mimicgen) | HTTP 200；标题 / 入口身份核对 |
| R04 | [MimicGen](https://mimicgen.github.io/) | HTTP 200；标题 / 入口身份核对 |
| R05, B03 | [[2306.03310] LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning](https://arxiv.org/abs/2306.03310) | HTTP 200；题名与摘要核对 |
| R05, B03 | [GitHub - Lifelong-Robot-Learning/LIBERO: Benchmarking Knowledge Transfer in Lifelong Robot Learning · GitHub](https://github.com/Lifelong-Robot-Learning/LIBERO) | HTTP 200；标题 / 入口身份核对 |
| E01 | [[2212.06817] RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817) | HTTP 200；题名与摘要核对 |
| E01 | [RT-1: Robotics Transformer](https://robotics-transformer1.github.io/) | HTTP 200；标题 / 入口身份核对 |
| E02 | [[2307.15818] RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818) | HTTP 200；题名与摘要核对 |
| E02 | [RT-2: Vision-Language-Action Models](https://robotics-transformer2.github.io/) | HTTP 200；标题 / 入口身份核对 |
| E03, DS04 | [[2310.08864] Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://arxiv.org/abs/2310.08864) | HTTP 200；题名与摘要核对 |
| E03, DS04 | [GitHub - google-deepmind/open_x_embodiment · GitHub](https://github.com/google-deepmind/open_x_embodiment) | HTTP 200；标题 / 入口身份核对 |
| E03 | [Open X-Embodiment: Robotic Learning Datasets and RT-X Models](https://robotics-transformer-x.github.io/) | HTTP 200；标题 / 入口身份核对 |
| E04 | [[2406.09246] OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/abs/2406.09246) | HTTP 200；题名与摘要核对 |
| E04 | [GitHub - openvla/openvla: OpenVLA: An open-source vision-language-action model for robotic manipulation. · GitHub](https://github.com/openvla/openvla) | HTTP 200；标题 / 入口身份核对 |
| E04 | [OpenVLA: An Open-Source Vision-Language-Action Model](https://openvla.github.io/) | HTTP 200；标题 / 入口身份核对 |
| E05 | [[2410.24164] $π_0$: A Vision-Language-Action Flow Model for General Robot Control](https://arxiv.org/abs/2410.24164) | HTTP 200；题名与摘要核对 |
| E05, E06 | [GitHub - Physical-Intelligence/openpi · GitHub](https://github.com/Physical-Intelligence/openpi) | HTTP 200；标题 / 入口身份核对 |
| E05 | [Our First Generalist Policy](https://www.physicalintelligence.company/blog/pi0) | HTTP 200；标题 / 入口身份核对 |
| E06 | [$\pi_0.5$: a Vision-Language-Action Model with Open-World Generalization](https://proceedings.mlr.press/v305/black25a.html) | HTTP 200；标题 / 入口身份核对 |
| E07 | [[2506.01844] SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics](https://arxiv.org/abs/2506.01844) | HTTP 200；题名与摘要核对 |
| E07 | [SmolVLA: Efficient Vision-Language-Action Model trained on Lerobot Community Data](https://huggingface.co/blog/smolvla) | HTTP 200；标题 / 入口身份核对 |
| E08 | [[2503.14734] GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734) | HTTP 200；题名与摘要核对 |
| E08 | [GitHub - NVIDIA/Isaac-GR00T: NVIDIA Isaac GR00T N1.7 -  A Foundation Model for Generalist Robots. · GitHub](https://github.com/NVIDIA/Isaac-GR00T) | HTTP 200；标题 / 入口身份核对 |
| W00 | [Verifying your browser  /  OpenReview](https://openreview.net/forum?id=BZ5a1r-kVsf) | HTTP 200，但为浏览器验证页；见上文索引核对 |
| W01 | [Mastering diverse control tasks through world models  /  Nature](https://www.nature.com/articles/s41586-025-08744-2) | HTTP 200；标题 / 入口身份核对 |
| W01 | [GitHub - danijar/dreamerv3: Mastering Diverse Domains through World Models · GitHub](https://github.com/danijar/dreamerv3) | HTTP 200；标题 / 入口身份核对 |
| W02 | [[2301.08243] Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243) | HTTP 200；题名与摘要核对 |
| W02 | [GitHub - facebookresearch/ijepa: Official codebase for I-JEPA, the Image-based Joint-Embedding Predictive Architecture. First outlined in the CVPR paper, "Self-supervised learning from images with a joint-embedding predictive architecture." · GitHub](https://github.com/facebookresearch/ijepa) | HTTP 200；标题 / 入口身份核对 |
| W03 | [[2411.04983] DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983) | HTTP 200；题名与摘要核对 |
| W03 | [GitHub - gaoyuezhou/dino_wm · GitHub](https://github.com/gaoyuezhou/dino_wm) | HTTP 200；标题 / 入口身份核对 |
| W03 | [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://dino-wm.github.io/) | HTTP 200；标题 / 入口身份核对 |
| W04 | [[2506.09985] V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | HTTP 200；题名与摘要核对 |
| W04, W06 | [GitHub - facebookresearch/vjepa2: PyTorch code and models for VJEPA2 self-supervised learning from video. · GitHub](https://github.com/facebookresearch/vjepa2) | HTTP 200；标题 / 入口身份核对 |
| W05 | [[2603.19312] LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://arxiv.org/abs/2603.19312) | HTTP 200；题名与摘要核对 |
| W05 | [GitHub - lucas-maes/le-wm: Official code base for LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels · GitHub](https://github.com/lucas-maes/le-wm) | HTTP 200；标题 / 入口身份核对 |
| W06 | [[2603.14482] V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning](https://arxiv.org/abs/2603.14482) | HTTP 200；题名与摘要核对 |
| M01 | [[1706.02275] Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275) | HTTP 200；题名与摘要核对 |
| M01 | [GitHub - openai/maddpg: Code for the MADDPG algorithm from the paper "Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments" · GitHub](https://github.com/openai/maddpg) | HTTP 200；标题 / 入口身份核对 |
| M02 | [[1803.11485] QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning](https://arxiv.org/abs/1803.11485) | HTTP 200；题名与摘要核对 |
| M02 | [GitHub - oxwhirl/pymarl: Python Multi-Agent Reinforcement Learning framework · GitHub](https://github.com/oxwhirl/pymarl) | HTTP 200；标题 / 入口身份核对 |
| M03 | [[2103.01955] The Surprising Effectiveness of PPO in Cooperative, Multi-Agent Games](https://arxiv.org/abs/2103.01955) | HTTP 200；题名与摘要核对 |
| M03 | [GitHub - marlbenchmark/on-policy: This is the official implementation of Multi-Agent PPO (MAPPO). · GitHub](https://github.com/marlbenchmark/on-policy) | HTTP 200；标题 / 入口身份核对 |
| M04, B08 | [[2411.00081] PARTNR: A Benchmark for Planning and Reasoning in Embodied Multi-agent Tasks](https://arxiv.org/abs/2411.00081) | HTTP 200；题名与摘要核对 |
| M04, DS08, B08 | [GitHub - facebookresearch/partnr-planner: A repository accompanying the PARTNR benchmark for using Large Planning Models (LPMs) to solve Human-Robot Collaboration or Robot Instruction Following tasks in the Habitat simulator. · GitHub](https://github.com/facebookresearch/partnr-planner) | HTTP 200；标题 / 入口身份核对 |
| M04, DS08, B08 | [官方入口](https://aihabitat.org/partnr/) | HTTP 200；标题 / 入口身份核对 |
| M05 | [[2506.18088] RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation](https://arxiv.org/abs/2506.18088) | HTTP 200；题名与摘要核对 |
| M05, DS07, B06 | [GitHub - RoboTwin-Platform/RoboTwin: [ICML 2026] RoboTwin 2.0 Offical Code Repo · GitHub](https://github.com/RoboTwin-Platform/RoboTwin) | HTTP 200；标题 / 入口身份核对 |
| M05, B06 | [RoboTwin 2.0](https://robotwin-platform.github.io/) | HTTP 200；标题 / 入口身份核对 |
| D01 | [Ray: A Distributed Framework for Emerging AI Applications  /  USENIX](https://www.usenix.org/conference/osdi18/presentation/moritz) | HTTP 200；标题 / 入口身份核对 |
| D01 | [GitHub - ray-project/ray: Ray is an AI compute engine. Ray consists of a core distributed runtime and a set of AI Libraries for accelerating ML workloads. · GitHub](https://github.com/ray-project/ray) | HTTP 200；标题 / 入口身份核对 |
| D02 | [Communication-Efficient Learning of Deep Networks from Decentralized Data](https://proceedings.mlr.press/v54/mcmahan17a.html) | HTTP 200；标题 / 入口身份核对 |
| D02, D03 | [GitHub - flwrlabs/flower: Flower: A Friendly Federated AI Framework · GitHub](https://github.com/flwrlabs/flower) | HTTP 200；标题 / 入口身份核对 |
| D03 | [[2007.14390] Flower: A Friendly Federated Learning Research Framework](https://arxiv.org/abs/2007.14390) | HTTP 200；题名与摘要核对 |
| D03 | [Flower Documentation](https://flower.ai/docs/) | HTTP 200；标题 / 入口身份核对 |
| D04, B10 | [FedScale: Benchmarking Model and System Performance of Federated Learning at Scale](https://proceedings.mlr.press/v162/lai22a.html) | HTTP 200；标题 / 入口身份核对 |
| D04, DS11, B10 | [GitHub - SymbioticLab/FedScale: FedScale is a scalable and extensible open-source federated learning (FL) platform. · GitHub](https://github.com/SymbioticLab/FedScale) | HTTP 200；标题 / 入口身份核对 |
| D05 | [[2309.06180] Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180) | HTTP 200；题名与摘要核对 |
| D05 | [GitHub - vllm-project/vllm: A high-throughput and memory-efficient inference and serving engine for LLMs · GitHub](https://github.com/vllm-project/vllm) | HTTP 200；标题 / 入口身份核对 |
| D06 | [[2401.09670] DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving](https://arxiv.org/abs/2401.09670) | HTTP 200；题名与摘要核对 |
| D06 | [GitHub - LLMServe/DistServe: Disaggregated serving system for Large Language Models (LLMs). · GitHub](https://github.com/LLMServe/DistServe) | HTTP 200；标题 / 入口身份核对 |
| DS01 | [Overview — robomimic 0.5 documentation](https://robomimic.github.io/docs/datasets/overview.html) | HTTP 200；标题 / 入口身份核对 |
| DS02 | [GitHub - tonyzhaozh/aloha · GitHub](https://github.com/tonyzhaozh/aloha) | HTTP 200；标题 / 入口身份核对 |
| DS03 | [BridgeData V2](https://bridgedata-v2.github.io/) | HTTP 200；标题 / 入口身份核对 |
| DS05 | [The DROID Dataset  /  DROID Docs](https://droid-dataset.github.io/droid/the-droid-dataset) | HTTP 200；标题 / 入口身份核对 |
| DS05 | [GitHub - droid-dataset/droid: Distributed Robot Interaction Dataset. · GitHub](https://github.com/droid-dataset/droid) | HTTP 200；标题 / 入口身份核对 |
| DS06 | [MimicGen (CoRL 2023) — mimicgen 1.0 documentation](https://mimicgen.github.io/docs/datasets/mimicgen_corl_2023.html) | HTTP 200；标题 / 入口身份核对 |
| DS07, B06 | [RoboTwin 2.0 - RoboTwin 2.0 Official Document](https://robotwin-platform.github.io/doc/) | HTTP 200；标题 / 入口身份核对 |
| DS09 | [Egocentric 4D Perception (EGO4D)](https://ego4d-data.org/) | HTTP 200；标题 / 入口身份核对 |
| DS10, B09 | [GitHub - TalwalkarLab/leaf: Leaf: A Benchmark for Federated Settings · GitHub](https://github.com/TalwalkarLab/leaf) | HTTP 200；标题 / 入口身份核对 |
| DS10, B09 | [[1812.01097] LEAF: A Benchmark for Federated Settings](https://arxiv.org/abs/1812.01097) | HTTP 200；题名与摘要核对 |
| DS11 | [FedScale/benchmark/dataset at master · SymbioticLab/FedScale · GitHub](https://github.com/SymbioticLab/FedScale/tree/master/benchmark/dataset) | HTTP 200；标题 / 入口身份核对 |
| SIM02 | [GitHub - isaac-sim/IsaacLab: Unified framework for robot learning with multi-physics/renderer support · GitHub](https://github.com/isaac-sim/IsaacLab) | HTTP 200；标题 / 入口身份核对 |
| SIM02 | [Redirecting to the latest Isaac Lab documentation](https://isaac-sim.github.io/IsaacLab/) | HTTP 200；标题 / 入口身份核对 |
| SIM03 | [GitHub - mani-skill/ManiSkill: Manipulation Skill Framework, an open source GPU parallelized robotics simulator and benchmark · GitHub](https://github.com/mani-skill/ManiSkill) | HTTP 200；标题 / 入口身份核对 |
| SIM03 | [ManiSkill](https://www.maniskill.ai/) | HTTP 200；标题 / 入口身份核对 |
| SIM04 | [GitHub - ARISE-Initiative/robosuite: robosuite: A Modular Simulation Framework and Benchmark for Robot Learning · GitHub](https://github.com/ARISE-Initiative/robosuite) | HTTP 200；标题 / 入口身份核对 |
| SIM04 | [robosuite  /  robosuite: A Modular Simulation Framework and Benchmark for Robot Learning](https://robosuite.ai/) | HTTP 200；标题 / 入口身份核对 |
| SIM05 | [GitHub - facebookresearch/habitat-lab: A modular high-level library to train embodied AI agents across a variety of tasks and environments. · GitHub](https://github.com/facebookresearch/habitat-lab) | HTTP 200；标题 / 入口身份核对 |
| SIM05 | [AI Habitat](https://aihabitat.org/) | HTTP 200；标题 / 入口身份核对 |
| B01 | [GitHub - Farama-Foundation/Metaworld: Collections of robotics environments geared towards benchmarking multi-task and meta reinforcement learning · GitHub](https://github.com/Farama-Foundation/Metaworld) | HTTP 200；标题 / 入口身份核对 |
| B01 | [Metaworld Documentation](https://metaworld.farama.org/) | HTTP 200；标题 / 入口身份核对 |
| B02 | [GitHub - stepjam/RLBench: A large-scale benchmark and learning environment. · GitHub](https://github.com/stepjam/RLBench) | HTTP 200；标题 / 入口身份核对 |
| B04 | [GitHub - robocasa/robocasa: RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots · GitHub](https://github.com/robocasa/robocasa) | HTTP 200；标题 / 入口身份核对 |
| B04 | [官方页面](https://robocasa.ai/) | 直接 GET TLS 失败；浏览工具成功读取正文 |
| B04 | [官方页面](https://robocasa.ai/leaderboard) | 直接 GET TLS 失败；浏览工具成功读取正文 |
| B05 | [GitHub - simpler-env/SimplerEnv: Evaluating and reproducing real-world robot manipulation policies (e.g., RT-1, RT-1-X, Octo) in simulation under common setups (e.g., Google Robot, WidowX+Bridge) (CoRL 2024) · GitHub](https://github.com/simpler-env/SimplerEnv) | HTTP 200；标题 / 入口身份核对 |
| B05 | [Evaluating Real-World Robot Manipulation Policies in Simulation](https://simpler-env.github.io/) | HTTP 200；标题 / 入口身份核对 |
| B07 | [GitHub - Farama-Foundation/PettingZoo: A standard API for multi-agent reinforcement learning environments, with popular reference environments and related utilities · GitHub](https://github.com/Farama-Foundation/PettingZoo) | HTTP 200；标题 / 入口身份核对 |
| B07 | [PettingZoo Documentation](https://pettingzoo.farama.org/) | HTTP 200；标题 / 入口身份核对 |
| F01 | [BAS-VLA  /  NeurIPS 2026](https://nebulis-lab.com/Beyond-Appearance-Shifts/) | HTTP 200；标题 / 入口身份核对 |
| F01 | [GitHub - NEBULIS-Lab/Beyond-Appearance-Shifts: (Neurips 2026) [BAS-VLA] Beyond Appearance Shifts: Task-Semantic Action Calibration for VLA Models · GitHub](https://github.com/NEBULIS-Lab/Beyond-Appearance-Shifts) | HTTP 200；标题 / 入口身份核对 |
| F01 | [[2609.23650] Beyond Appearance Shifts: Task-Semantic Action Calibration for VLA Models](https://arxiv.org/abs/2609.23650) | HTTP 200；题名与摘要核对 |
| F02 | [D-JEPA: A Decision-Aligned Latent World Model](https://nebulis-lab.com/D-JEPA/) | HTTP 200；标题 / 入口身份核对 |
| F02 | [[2609.24749] D-JEPA: A Decision-Aligned Latent World Model](https://arxiv.org/abs/2609.24749) | HTTP 200；题名与摘要核对 |
| F02 | [GitHub - NEBULIS-Lab/D-JEPA: D-JEPA: A Decision-Aligned Latent World Model · GitHub](https://github.com/NEBULIS-Lab/D-JEPA) | HTTP 200；标题 / 入口身份核对 |
| F04 | [When Replanning Becomes the Bottleneck: Budgeted Replanning for Embodied Agents](https://nebulis-lab.com/BRACE/) | HTTP 200；标题 / 入口身份核对 |
| F04 | [GitHub - NEBULIS-Lab/BRACE: (ICML 2026) When Replanning Becomes the Bottleneck: Budgeted Replanning for Embodied Agents · GitHub](https://github.com/NEBULIS-Lab/BRACE) | HTTP 200；标题 / 入口身份核对 |
| F04 | [[2608.01428] When Replanning Becomes the Bottleneck: Budgeted Replanning for Embodied Agents](https://arxiv.org/abs/2608.01428) | HTTP 200；题名与摘要核对 |
| F05 | [官方 PDF](https://ningxinsu.github.io/assets/ningxin-tkde26.pdf) | HTTP 200；标题 / 入口身份核对 |
| F05 | [GitHub - TL-System/plato: Plato: A Research Framework for Federated Learning · GitHub](https://github.com/TL-System/plato) | HTTP 200；标题 / 入口身份核对 |
| F05 | [官方入口](https://doi.org/10.1109/TKDE.2026.3697810) | HTTP 202，解析到 IEEE 文献号 11536925；题录由 HKUST 官方记录确认 |

## 结构检查

- 66 个资源 ID 唯一；所有前置、相关资源和路线节点引用均存在。
- 所有资源有 2–3 条中文学习要点，所有术语引用存在。
- 11 个 DS 节点的 `dataset` 四项元数据完整；5 条路线各含 5–7 个节点。
- 所有目录链接为 HTTPS，没有 `utm_` 参数；R01 / S02 不在同一路线重复出现。
- 本记录不把“资源已列出”“入口可达”“研究结论已复现”混为一谈。全文复现不属于此导航站的内容制作范围。
